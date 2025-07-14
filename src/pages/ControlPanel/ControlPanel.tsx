import { NavLink, Outlet } from "react-router-dom";
import { PageLayout } from "../PageLayout";
import './ControlPanel.scss';
import classNames from "classnames";

export const ControlPanel = () => {
  return (
    <PageLayout pageTitle="Control panel" isLoading={false} errorMessage="">
      <div className="control-panel">
        <div className="control-panel__nav">
          <NavLink
            className={({ isActive }: { isActive: boolean }) =>
              classNames(`control-panel__button`, {
                "control-panel__button--active": isActive,
              })
            }
            to={"reports"}
          >
            Reports
          </NavLink>
          <NavLink
            className={({ isActive=true }: { isActive: boolean }) =>
              classNames(`control-panel__button`, {
                "control-panel__button--active": isActive,
              })
            }
            to={"blocked-users"}
          >
            Blocked users
          </NavLink>
        </div>
        <div className="control-panel__content">
          <Outlet />
        </div>
      </div>
    </PageLayout>
  );
}