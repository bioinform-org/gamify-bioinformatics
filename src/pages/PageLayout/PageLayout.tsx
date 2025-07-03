import { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import "./PageLayout.scss";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUser, removeErrorMessageForUser, selectUser } from "../../store/features/userSlice";
import { removeToken, selectToken } from "../../store/features/tokenSlice";

type Props = {
  children: React.ReactNode;
  pageTitle: string;
  isLoading: boolean;
  errorMessage: string;
};

export const PageLayout: React.FC<Props> = ({
  children,
  pageTitle,
  isLoading,
  errorMessage,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user.value && token.value) {
      dispatch(getUser(token.value));
    }
  }, [dispatch, token.value, user.value])

  return (
    <div className="page-layout">
      <Sidebar />

      <div className="page-layout__content">
        <div className="page-layout__header">
          <h2 className="page-layout__title">{pageTitle}</h2>
          <div className="page-layout__user">
            <img
              className="page-layout__user-img"
              src="../../../public/images/avatar_by_default.svg"
              alt=""
            />
            <button
              className="page-layout__user-btn"
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              //using setTimeout to give some time for a click on the link to be processed before closing
              onBlur={() => setTimeout(() => setIsMenuOpen(false), 240)}
            >
              {user.isLoading && <Loader shouldBeText={false}/>}
              {!user.isLoading && 'Admin'}
            </button>
          </div>

          {isMenuOpen && (
            <ul className="page-layout__user-menu">
              <li className="page-layout__user-menu-item">
                <Link
                  className="page-layout__user-menu-btn page-layout__user-menu-btn--settings"
                  to="/settings/account"
                >
                  Settings
                </Link>
              </li>
              <li className="page-layout__user-menu-item">
                <Link
                  className="page-layout__user-menu-btn page-layout__user-menu-btn--help"
                  to="/help-center"
                >
                  Help Center
                </Link>
              </li>
              <li className="page-layout__user-menu-item">
                <Link
                  className="page-layout__user-menu-btn page-layout__user-menu-btn--logout"
                  to=""
                  onClick={() => {
                    dispatch(removeToken());
                    dispatch(removeErrorMessageForUser());
                  }}
                >
                  Log Out
                </Link>
              </li>
            </ul>
          )}
        </div>

        {children}

        {isLoading && (
          <div className="page-layout__loader">
            <p className="page-layout__loader-text">
              Please wait a moment while the page loads.
            </p>

            <Loader />
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="page-layout__error-message">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};
