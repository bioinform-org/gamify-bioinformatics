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
              <p>{`Report reason: ${report.reason}`}</p>
              <p>{`Reported by ${report.userName} ${report.date} ${report.chatName}`}</p>
            </div>
            <div className="reports__actions">
              <Link to={"#"}>Delete report</Link>
              <Link to={"#"}>View</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}