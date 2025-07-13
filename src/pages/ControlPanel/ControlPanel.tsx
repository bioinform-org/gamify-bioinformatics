import { NavLink, Outlet } from "react-router-dom";
import { PageLayout } from "../PageLayout";

export const ControlPanel = () => {
  return (
    <PageLayout
      pageTitle="Control panel"
      isLoading={false}
      errorMessage=""
    >
      <div className="control-panel">
        <div className="control-panel__nav">
          <NavLink to={"reports"}>Reports</NavLink>
          <NavLink to={"blocked-users"}>Blocked users</NavLink>
        </div>
        <div className="control-panel__content">
          <Outlet />
        </div>
      </div>
    </PageLayout>
  );
}