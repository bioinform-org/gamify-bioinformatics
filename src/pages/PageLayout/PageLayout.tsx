import { useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import "./PageLayout.scss";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser, setUser } from "../../store/features/userSlice";

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
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

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
            >
              {user.value?.userName}
            </button>
          </div>
          {isMenuOpen && (
            <ul className="page-layout__user-menu">
              <li className="page-layout__user-menu-item">
                <Link
                  className="page-layout__user-menu-btn page-layout__user-menu-btn--settings"
                  to="/settings"
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
                  //adding logging out by setting user to null
                  onClick={() => dispatch(setUser(null))}
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
