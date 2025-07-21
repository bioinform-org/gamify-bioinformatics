import React, { useEffect, useState } from "react";
import { PageLayout } from "../PageLayout";
import "./Team.scss";
// import { getTeams } from "../../api";
import { TeamType } from "../../types/TeamType";
import classNames from "classnames";
import { Role } from "../../types/Roles";
import { User } from "../../types/ProductType";
// import { selectToken } from "../../store/features/tokenSlice";
// import { useAppSelector } from "../../store/hooks";

// const mockUsers: User[] = [
//   {
//     id: 1,
//     name: "John Doe",
//     username: "johndoe",
//     scorePoints: 120,
//     email: "john.doe@example.com",
//     role: Role.user,
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     username: "janesmith",
//     scorePoints: 100,
//     email: "jane.smith@example.com",
//     role: Role.admin,
//   },
//   {
//     id: 3,
//     name: "Mike Brown",
//     username: "mikebrown",
//     scorePoints: 90,
//     email: "mike.brown@example.com",
//     role: Role.user,
//   },
//   {
//     id: 4,
//     name: "Brad Pitt",
//     username: "braddy",
//     scorePoints: 90,
//     email: "bradpitt@example.com",
//     role: Role.user,
//   },
// ];

const mockOwnerTeams: TeamType[] = [
  {
    id: "1",
    name: "Team Alpha",
    members: [
      {
        id: 1,
        name: "John Doe",
        username: "johndoe",
        scorePoints: 120,
        email: "john.doe@example.com",
        role: Role.user,
        photo: null,
      },
      {
        id: 2,
        name: "Jane Smith",
        username: "janesmith",
        scorePoints: 100,
        email: "jane.smith@example.com",
        role: Role.admin,
        photo: null,
      },
      {
        id: 3,
        name: "Mike Brown",
        username: "mikebrown",
        scorePoints: 90,
        email: "mike.brown@example.com",
        role: Role.user,
        photo: null,
      },
    ],
  },
  { id: "2", name: "Team Beta", members: [] },
];

const mockMemberTeams: TeamType[] = [
  {
    id: "3",
    name: "Team Frontend",
    members: [
      {
        id: 1,
        name: "John Doe",
        username: "johndoe",
        scorePoints: 120,
        email: "john.doe@example.com",
        role: Role.user,
        photo: null,
      },
      {
        id: 2,
        name: "Jane Smith",
        username: "janesmith",
        scorePoints: 100,
        email: "jane.smith@example.com",
        role: Role.admin,
        photo: null,
      },
      {
        id: 3,
        name: "Mike Brown",
        username: "mikebrown",
        scorePoints: 90,
        email: "mike.brown@example.com",
        role: Role.user,
        photo: null,
      },
    ],
  },
  { id: "4", name: "Team Backend", members: [] },
];

interface Props {}

export const Team: React.FC<Props> = () => {
  // const token = useAppSelector(selectToken);

  const [errorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("myTeams");
  const [isModalOpen, setModalOpen] = useState(false);

  const [teams, setTeams] = useState<TeamType[]>([]);
  const [memberTeams] = useState<TeamType[]>(mockMemberTeams);
  const [expandedTeamId] = useState<string | null>(null);

  const [teamName] = useState("");
  const [isTeamNameSuccess, setIsTeamNameSuccess] = useState(false);

  const [userEmail] = useState("");
  const [userEmailError] = useState("");
  const [suggestedUsers] = useState<User[]>([]);

  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [isTeamMembersSuccess] = useState(false);

  console.log(teamMembers);

  // useEffect(() => {
  //   setIsLoading(true);
  //   if (token.value) {
  //     getTeams(token.value)
  //       .then((fetchedTeams) => {
  //         setTeams(fetchedTeams);
  //       })
  //       .catch(() => {
  //         setErrorMessage("Something went wrong!");
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   }
  // }, []);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setTeams(mockOwnerTeams);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <PageLayout
      pageTitle="Team managment"
      isLoading={isLoading}
      errorMessage={errorMessage}
    >
      {!isLoading && !errorMessage && (
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
                {!isLoading && teams.length > 0 && (
                  <div className="team__list-block">
                    <h3 className="team__list-title">Owner</h3>
                    <ul className="team__list">
                      {teams.map((team: TeamType) => (
                        <React.Fragment key={team.id}>
                          <li className="team__list-item">
                            <button
                              type="button"
                              className={classNames("team__list-item-button", {
                                "team__list-item-button--open":
                                  expandedTeamId === team.id,
                              })}
                            ></button>
                            {team.name}
                          </li>
                          {expandedTeamId === team.id && (
                            <ul className="team__members">
                              {team.members
                                .sort(
                                  (a, b) =>
                                    (b.role === Role.admin ? 1 : 0) -
                                    (a.role === Role.admin ? 1 : 0)
                                )
                                .map((member) => (
                                  <li key={member.id} className="team__member">
                                    <img
                                      className="team__member-img"
                                      src=""
                                      alt=""
                                    />

                                    <h4 className="team__member-name">
                                      {member.name}
                                    </h4>

                                    <span className="team__member-role">
                                      {member.role === Role.admin
                                        ? "Administrator"
                                        : "Member"}
                                    </span>

                                    <button
                                      type="button"
                                      className="team__member-delete"
                                    ></button>
                                  </li>
                                ))}
                            </ul>
                          )}
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                )}

                {!isLoading && teams.length > 0 && (
                  <div className="team__list-block">
                    <h3 className="team__list-title">Member</h3>
                    <ul className="team__list">
                      {memberTeams.map((team: TeamType) => (
                        <React.Fragment key={team.id}>
                          <li className="team__list-item">
                            <button
                              type="button"
                              className={classNames("team__list-item-button", {
                                "team__list-item-button--open":
                                  expandedTeamId === team.id,
                              })}
                            ></button>
                            {team.name}
                          </li>
                          {expandedTeamId === team.id && (
                            <ul className="team__members">
                              {team.members
                                .sort(
                                  (a, b) =>
                                    (b.role === Role.admin ? 1 : 0) -
                                    (a.role === Role.admin ? 1 : 0)
                                )
                                .map((member) => (
                                  <li key={member.id} className="team__member">
                                    <img
                                      className="team__member-img"
                                      src=""
                                      alt=""
                                    />

                                    <h4 className="team__member-name">
                                      {member.name}
                                    </h4>

                                    <span className="team__member-role">
                                      {member.role === Role.admin
                                        ? "Administrator"
                                        : "Member"}
                                    </span>

                                    <button
                                      type="button"
                                      className="team__member-delete"
                                    ></button>
                                  </li>
                                ))}
                            </ul>
                          )}
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                )}

                {!isLoading && teams.length === 0 && !errorMessage && (
                  <>
                    <img
                      className="team__content-img"
                      src="/images/no-teams.svg"
                      alt="no teams"
                    />
                    <p className="team__content-message">No teams were added</p>
                  </>
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
                  type="button"
                  className="team__modal-close"
                  onClick={() => setModalOpen(false)}
                ></button>

                {!isTeamMembersSuccess ? (
                  <>
                    {!isTeamNameSuccess ? (
                      <>
                        <img
                          src="/images/people.svg"
                          alt="People image"
                        />

                        <h2 className="team__modal-title">Create your team</h2>

                        <label className="team__modal-label">
                          <input
                            type="text"
                            placeholder="Name your team"
                            className="team__modal-input"
                            value={teamName}
                          />

                          <span
                            className={`team__modal-input-counter ${
                              teamName.length > 30
                                ? "team__modal-input-counter--error"
                                : ""
                            }`}
                          >
                            {teamName.length}/30
                          </span>
                        </label>

                        <div className="team__modal-actions">
                          <button type="button" className="team__modal-cancel">
                            Cancel
                          </button>

                          <button
                            type="button"
                            className="team__modal-create"
                            onClick={() => setIsTeamNameSuccess(true)}
                            disabled={
                              teamName.trim() === "" || teamName.length > 30
                            }
                          >
                            Create team
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <img
                          src="/images/avatars.svg"
                          alt="Avatars image"
                        />

                        <h2 className="team__modal-title">{teamName}</h2>

                        <label className="team__modal-label">
                          <div className="team__tags">
                            {teamMembers.map((member) => (
                              <span key={member.id} className="team__tag">
                                {member.email}
                                <button
                                  type="button"
                                  className="team__tag-remove"
                                  onClick={() => {
                                    console.log("Removing member:", member.id);
                                    setTeamMembers((prev) => {
                                      const updated = prev.filter((user) =>
                                        console.log(
                                          user.id === member.id
                                            ? `${user.id} for this is true`
                                            : "false"
                                        )
                                      );
                                      console.log(
                                        "Updated team members:",
                                        updated
                                      );
                                      return updated;
                                    });
                                  }}
                                ></button>
                              </span>
                            ))}
                            <input
                              type="email"
                              placeholder="Enter users email"
                              className={classNames(
                                "team__modal-input team__modal-input--email",
                                {
                                  "team__modal-input--error": userEmailError,
                                }
                              )}
                              value={userEmail}
                              style={{
                                marginBlock:
                                  teamMembers.length < 2 ? "-9px" : "0",
                              }}
                            />
                          </div>

                          {suggestedUsers.length > 0 && (
                            <ul className="team__modal-suggestions">
                              {suggestedUsers.map((user) => (
                                <li
                                  key={user.id}
                                  className="team__modal-suggestion"
                                >
                                  <img
                                    className="team__modal-suggestion-avatar"
                                    src=""
                                    alt="Ava"
                                  />
                                  <div className="team__modal-suggestion-info">
                                    <h5 className="team__modal-suggestion-name">
                                      {user.name}
                                    </h5>
                                    <p className="team__modal-suggestion-email">
                                      {user.email}
                                    </p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </label>

                        {userEmailError !== "" ? (
                          <p className="team__modal-input-message team__modal-input-message--error">
                            {userEmailError}
                          </p>
                        ) : (
                          <p className="team__modal-input-message">
                            You can add up to 10 people at a time
                          </p>
                        )}

                        <div className="team__modal-actions">
                          <button type="button" className="team__modal-cancel">
                            Cancel
                          </button>

                          <button
                            type="button"
                            className="team__modal-create"
                            disabled={teamMembers.length === 0}
                          >
                            Add members
                          </button>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <img src="/images/done-icon.svg" alt="Done icon" />

                    <h2 className="team__modal-title">
                      Your team was successfully created
                    </h2>
                    <p>Users will join the team by accepting your request</p>

                    <button type="button" className="team__modal-continue">
                      Continue
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </PageLayout>
  );
};
