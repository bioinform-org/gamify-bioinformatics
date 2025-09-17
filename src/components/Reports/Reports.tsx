import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Link } from "react-router-dom";
import "./Reports.scss";
import { deleteReport, fetchReports, selectReports } from "../../store/features/reportsSlice";

export const Reports = () => {
  const dispatch = useAppDispatch();
  const { value: reports} = useAppSelector(selectReports);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  return (
    <div className="reports">
      {reports.map((report) => (
        <div key={report.id} className="reports__items">
          <div className="reports__info">
            <p className="reports__title">{`Report reason: ${report.reason}`}</p>
            <p className="reports__details">
              Reported by <a href="#">{report.userName}</a>{" "}
              {new Date(report.date).toLocaleString()}{" "}
              <a href="#">{report.chatName}</a>
            </p>
          </div>
          <div className="reports__actions">
            <Link
              className="reports__delete-btn"
              to={"#"}
              onClick={() => dispatch(deleteReport(report.id))}
            >
              Delete report
            </Link>
            <Link className="reports__view-btn" to={"#"}>
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
