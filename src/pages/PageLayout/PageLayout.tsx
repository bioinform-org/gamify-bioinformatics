import { useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { Loader } from "../../components/Loader/Loader";
import { useAppDispatch } from "../../store/hooks";
import { removeErrorMessageForUser } from "../../store/features/userSlice";
import { removeToken } from "../../store/features/tokenSlice";
import "./PageLayout.scss";

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
  const dispatch = useAppDispatch();

  return (
    <div className="page-layout">
      <aside className="page-layout__sidebar-container">
        <Sidebar />
      </aside>

      <div className="page-layout__right-panel">
        
        <header className="page-layout__header">
          <h2 className="page-layout__title">{pageTitle}</h2>
          
          <div className="page-layout__user">
            <img
              className="page-layout__user-img"
              src="/images/avatar_by_default.svg"
              alt="User"
            />
            <button
              className="page-layout__user-btn"
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onBlur={() => setTimeout(() => setIsMenuOpen(false), 240)}
            >
              Admin
            </button>

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
        </header>

        <main className="page-layout__content-scroll">
          {children}

          {isLoading && (
            <div className="page-layout__loader">
              <p className="page-layout__loader-text">Loading...</p>
              <Loader />
            </div>
          )}

          {!isLoading && errorMessage && (
            <div className="page-layout__error-message">{errorMessage}</div>
          )}
        </main>
      </div>
    </div>
  );
};
