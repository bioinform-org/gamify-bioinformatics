import { Link } from "react-router-dom";
import './Reports.scss';

const reports = [
  {
    reason: "Abuse or harassment",
    userName: "John",
    chatName: "bioinformatic-learning",
    date: Date.now(),
  },
  {
    reason: "Abuse or harassment",
    userName: "Anna",
    chatName: "python-learning",
    date: Date.now(),
  },
];

export const Reports = () => {
  return (
    <div className="reports">
      {reports.map((report, index) => {
        return (
          <div key={index} className="reports__items">
            <div className="reports__info">
              <p className="reports__title">{`Report reason: ${report.reason}`}</p>
              <p className="reports__details">
                Reported by <a href="#">{report.userName}</a> {report.date}{" "}
                <a href="#">{report.chatName}</a>
              </p>
            </div>
            <div className="reports__actions">
              <Link className="reports__delete-btn" to={"#"}>
                Delete report
              </Link>
              <Link className="reports__view-btn" to={"#"}>
                View
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}