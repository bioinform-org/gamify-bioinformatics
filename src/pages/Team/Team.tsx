import { useEffect, useState } from "react";
import { PageLayout } from "../PageLayout";
import "./team.scss";
import { getTeams } from "../../api";

interface Props {}

export const Team: React.FC<Props> = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("myTeams");
  const [isModalOpen, setModalOpen] = useState(false);

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getTeams()
      .then(setTeams)
      .catch(() => {
        setErrorMessage("Something went wrong!");
      })
      .finally(() => setIsLoading(false));
  }, []);

  console.log(teams);

  return (
    <PageLayout
      pageTitle="Team managment"
      isLoading={isLoading}
      errorMessage={errorMessage}
    >
      <div className="team">
        <div className="team__header">
          <ul className="team__tabs">
            <li className="team__tab">
              <button
                className={`team__tab-button ${
                  activeTab === "myTeams" ? "team__tab-button--active" : ""
                }`}
                onClick={() => setActiveTab("myTeams")}
              >
                My teams
              </button>
            </li>
            <li className="team__tab">
              <button
                className={`team__tab-button ${
                  activeTab === "pending" ? "team__tab-button--active" : ""
                }`}
                onClick={() => setActiveTab("pending")}
              >
                Pending <span className="team__tab-button-info">1</span>
              </button>
            </li>
          </ul>
          <button
            className="team__create-btn"
            onClick={() => setModalOpen(true)}
          >
            Create team
          </button>
        </div>

        <div className="team__content">
          {activeTab === "myTeams" && (
            <>
              {isLoading && teams.length > 0 && (
                <p className="team__content-message">TEAMS</p>
              )}

              {isLoading && teams.length === 0 && (
                <p className="team__content-message">No teams were added</p>
              )}
            </>
          )}

          {activeTab === "pending" && (
            <p className="team__content-message">No pending invitation</p>
          )}
        </div>

        {isModalOpen && (
          <>
            <div
              className="team__overlay"
              onClick={() => setModalOpen(false)}
            ></div>
            <div className="team__modal">
              <button
                className="team__modal-close"
                onClick={() => setModalOpen(false)}
              ></button>
              <h2 className="team__modal-title">Create your team</h2>
              <input
                type="text"
                placeholder="Name your team"
                className="team__modal-input"
              />
              <div className="team__modal-actions">
                <button
                  type="button"
                  className="team__modal-cancel"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="button" className="team__modal-create">
                  Create team
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
};
