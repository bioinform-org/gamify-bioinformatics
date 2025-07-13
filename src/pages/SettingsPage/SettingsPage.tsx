import { NavLink, Outlet } from 'react-router-dom';
import { PageLayout } from '../PageLayout';
import './SettingsPage.scss';
import classNames from 'classnames';

interface Props {}

export const SettingsPage: React.FC<Props> = () => {
  return (
    <PageLayout
      pageTitle='Settings'
      isLoading={false}
      errorMessage=''
    >
      <div className="settings-page">
        <div className="settings-page__tabs">
          <div className="settings-page__tabs-header">
            <NavLink 
              className={({ isActive }) => classNames(
                "settings-page__tab", 
                {
                  "settings-page__tab--active": isActive,
                }
              )}
              to="./account"
            >
              Account
            </NavLink>

            <NavLink 
              className={({ isActive }) => classNames(
                "settings-page__tab", 
                {
                  "settings-page__tab--active": isActive,
                }
              )}
              to="./password"
            >
              Password
            </NavLink>

            <NavLink 
              className={({ isActive }) => classNames(
                "settings-page__tab", 
                {
                  "settings-page__tab--active": isActive,
                }
              )}
              to="./connected-accounts"
            >
              Connected accounts
            </NavLink>
          </div>
          <div className="settings-page__tabs-content">
            <Outlet />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
