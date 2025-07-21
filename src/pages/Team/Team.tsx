import React, { useEffect, useRef, useState } from "react";
import { PageLayout } from "../PageLayout";
import "./Team.scss";
// import { getTeams } from "../../api";
import { Pending, TeamType } from "../../types/TeamType";
import classNames from "classnames";
import { Role } from "../../types/Roles";
import { User } from "../../types/ProductType";
// import { selectToken } from "../../store/features/tokenSlice";
// import { useAppSelector } from "../../store/hooks";

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    scorePoints: 120,
    email: "john.doe@example.com",
    role: Role.user,
    photo: null
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    scorePoints: 100,
    email: "jane.smith@example.com",
    role: Role.admin,
    photo: null
  },
  {
    id: 3,
    name: "Mike Brown",
    username: "mikebrown",
    scorePoints: 90,
    email: "mike.brown@example.com",
    role: Role.user,
    photo: null
  },
  {
    id: 4,
    name: "Brad Pitt",
    username: "braddy",
    scorePoints: 90,
    email: "brad.pitt@example.com",
    role: Role.user,
    photo: null
  },
  {
    id: 5,
    name: "Albert Einstein",
    username: "emce",
    scorePoints: 120,
    email: "albert.einstein@example.com",
    role: Role.user,
    photo: null
  },
  {
    id: 6,
    name: "Jhon Prince",
    username: "prince",
    scorePoints: 120,
    email: "jhon.prince@example.com",
    role: Role.user,
    photo: null
  },
];

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

const mockPending: Pending[] = [
  {
    id: "p1",
    team: {
        id: '2242',
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
        ],
        name: 'Team Fullstack'
      },
    sender: mockUsers[1],
    status: false,
  },
  {
    id: "p2",
    team: {
        id: '2241',
        members: [
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
        name: 'Team QA'
      },
    sender: mockUsers[2],
    status: false,
  },
];

export const Team: React.FC = () => {
  // const token = useAppSelector(selectToken);

  const optionsMenuRef = useRef<HTMLUListElement | null>(null);

  const [errorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("myTeams");
  const [isModalOpen, setModalOpen] = useState(false);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [teams, setTeams] = useState<TeamType[]>([]);
  const [memberTeams, setMemberTeams] = useState<TeamType[]>(mockMemberTeams);
  const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);

  const [teamName, setTeamName] = useState("");
  const [isTeamNameSuccess, setIsTeamNameSuccess] = useState(false);

  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [isRenaming, setIsRenaming] = useState(false);

  const [confirmTeamId, setConfirmTeamId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<"delete" | "leave" | null>(null);

  const [userEmail, setUserEmail] = useState("");
  const [userEmailError, setUserEmailError] = useState("")
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([]);

  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [isTeamMembersSuccess, setIsTeamMembersSuccess] = useState(false);

  const [optionsTeamId, setOptionsTeamId] = useState<string | null>(null);

  const [isPending, setIsPending ] = useState<Pending[]>(mockPending);

  const resetTeamCreation = () => {
    setIsRenaming(false);
    setEditingTeamId(null);
    setTeamName("");
    setIsTeamNameSuccess(false);
    setUserEmail("");
    setTeamMembers([]);
    setIsTeamMembersSuccess(false);
    setModalOpen(false);
    setConfirmTeamId(null);
    setConfirmAction(null);
  };

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsMenuRef.current &&
        !optionsMenuRef.current.contains(event.target as Node)
      ) {
        setOptionsTeamId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const actualMembers = (() => {
    const owner = teams.find(t => t.id === editingTeamId);
    if (owner) return owner.members;
    const member = memberTeams.find(t => t.id === editingTeamId);
    return member ? member.members : [];
  })();

  const filteredSuggestions = suggestedUsers.filter(user =>
    !teamMembers.some(member => member.id === user.id) &&
    !actualMembers.some(member => member.id === user.id)
  );


  useEffect(() => {
  const trimmedEmail = userEmail.trim().toLowerCase();

  if (trimmedEmail === "") {
    setUserEmailError("");
    setSuggestedUsers([]);
    return;
  }

  const timeoutId = setTimeout(() => {
    const matchedUsers = mockUsers.filter(user =>
      user.email.toLowerCase().includes(trimmedEmail)
    );

    setSuggestedUsers(matchedUsers);

    const hasAtSymbol = trimmedEmail.includes("@");

    if (matchedUsers.length === 0) {
      if (hasAtSymbol) {
        setUserEmailError("User not found");
      } else {
        setUserEmailError("Please check that email address is indicated correctly");
      }
    } else {
      setUserEmailError("");
    }
  }, 300);

  return () => clearTimeout(timeoutId);
}, [userEmail]);


  const handleReject = (id: string) => {
    setIsPending(prev => prev.filter(req => req.id !== id));
  };


  const handleAccept = (request: Pending) => {
  const { team } = request;
  const userToAdd = mockUsers[4];

  setMemberTeams(prev => {
    const existing = prev.find(t => t.id === team.id);
    
    if (existing) {
      const hasUser = existing.members.some(m => m.id === userToAdd.id);
      const updatedMembers = hasUser
        ? existing.members
        : [...existing.members, userToAdd];

      return prev.map(t =>
        t.id === team.id
          ? { ...t, members: updatedMembers }
          : t
      );
    } else {
      const hasUser = team.members.some(m => m.id === userToAdd.id);
      const newMembers = hasUser
        ? team.members
        : [...team.members, userToAdd];

      return [...prev, { ...team, members: newMembers }];
    }
  });

  setIsPending(prev => prev.filter(p => p.id !== request.id));
};


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
                  Pending {isPending.length > 0 && <span className="team__tab-button-info">{isPending.length}</span>}
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
                              onClick={() => {
                                setExpandedTeamId(prev => prev === team.id ? null : team.id);
                              }}
                              className={classNames("team__list-item-button", {
                                "team__list-item-button--open":
                                  expandedTeamId === team.id,
                              })}
                            ></button>
                            {team.name}
                            <button 
                              className={classNames("team__options", {
                                "team__options--active": optionsTeamId === team.id,
                              })}
                              onClick={() =>
                                setOptionsTeamId(prev => (prev === team.id ? null : team.id))
                              }
                            >
                            </button>
                            {optionsTeamId === team.id && (
                              <ul className="team__options-menu" ref={optionsMenuRef}>
                                <li 
                                  className="team__options-menu-option" 
                                  onClick={() => {
                                    setEditingTeamId(team.id);
                                    setTeamName(team.name);
                                    setTeamMembers([]);
                                    setSuggestedUsers([]);
                                    setIsTeamNameSuccess(true);
                                    setModalOpen(true);
                                    setOptionsTeamId(null);
                                  }}>
                                  <img src="/images/userplus.svg" alt="" />
                                  <button
                                    className="team__options-button"
                                    
                                  >
                                    Invite members
                                  </button>
                                </li>
                                <li 
                                  className="team__options-menu-option" 
                                  onClick={() => {
                                    setEditingTeamId(team.id);
                                    setTeamName(team.name);
                                    setIsRenaming(true);
                                    setIsTeamNameSuccess(false);
                                    setModalOpen(true);
                                    setOptionsTeamId(null);
                                  }}>
                                  <img src="/images/pencil.svg" alt="" />
                                  <button 
                                    className="team__options-button" 
                                    
                                  >
                                    Rename team
                                  </button>
                                </li>
                                <li 
                                  className="team__options-menu-option" 
                                  onClick={() => {
                                    setConfirmTeamId(team.id);
                                    setConfirmAction("delete");
                                    setOptionsTeamId(null);
                                    setModalOpen(true);
                                    setIsTeamMembersSuccess(true);
                                  }}>
                                  <img src="/images/trash.svg" alt="" />
                                  <button
                                    className="team__options-button"
                                  >
                                    Delete team
                                  </button>
                                </li>
                              </ul>
                            )}
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
                                      src={member.photo ?? `/images/emma-johnson.jpg`}
                                      alt={member.name}
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
                                      onClick={() => {
                                        setModalOpen(true);
                                        setIsConfirmOpen(true);
                                        setUserEmail(member.email)
                                      }}
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

                {!isLoading && memberTeams.length > 0 && (
                  <div className="team__list-block">
                    <h3 className="team__list-title">Member</h3>
                    <ul className="team__list">
                      {memberTeams.map((team: TeamType) => (
                        <React.Fragment key={team.id}>
                          <li className="team__list-item">
                            <button
                              type="button"
                              onClick={() => {
                                setExpandedTeamId(prev => prev === team.id ? null : team.id);
                              }}
                              className={classNames("team__list-item-button", {
                                "team__list-item-button--open":
                                  expandedTeamId === team.id,
                              })}
                            ></button>
                            {team.name}
                            <button 
                              className={classNames("team__options", {
                                "team__options--active": optionsTeamId === team.id,
                              })}
                              onClick={() =>
                                setOptionsTeamId(prev => (prev === team.id ? null : team.id))
                              }
                            >
                            </button>
                            {optionsTeamId === team.id && (
                              <ul className="team__options-menu" ref={optionsMenuRef}>
                                <li 
                                  className="team__options-menu-option" 
                                  onClick={() => {
                                      setEditingTeamId(team.id);
                                      setTeamName(team.name);
                                      setTeamMembers([]);
                                      setSuggestedUsers([]);
                                      setIsTeamNameSuccess(true);
                                      setModalOpen(true);
                                      setOptionsTeamId(null);
                                    }}>
                                  <img src="/images/userplus.svg" alt="" />
                                  <button
                                    className="team__options-button"
                                  >
                                    Invite members
                                  </button>
                                </li>
                                <li 
                                  className="team__options-menu-option" 
                                  onClick={() => {
                                    setConfirmTeamId(team.id);
                                    setConfirmAction("leave");
                                    setOptionsTeamId(null);
                                    setModalOpen(true);
                                  }}>
                                  <img src="/images/logout.svg" alt="" />
                                  <button
                                    className="team__options-button"
                                    
                                  >
                                    Leave team
                                  </button>
                                </li>
                              </ul>
                            )}
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
                                      src={member.photo ?? `/images/emma-johnson.jpg`}
                                      alt={member.name}
                                    />

                                    <h4 className="team__member-name">
                                      {member.name}
                                    </h4>

                                    <span className="team__member-role">
                                      {member.role === Role.admin
                                        ? "Administrator"
                                        : "Member"}
                                    </span>
                                  </li>
                                ))}
                            </ul>
                          )}
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                )}

                {!isLoading && teams.length === 0 && !errorMessage && memberTeams.length === 0 && (
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
              !isLoading && isPending?.length === 0 && !errorMessage ? (
                <>
                  <img
                    className="team__content-img"
                    src="/images/no-teams.svg"
                    alt="no pendings"
                  />
                  <p className="team__content-message">No pending invitation</p>
                </>
              ) : (
                <ul className="team__list">
                  {isPending.map(p => (
                    <li key={p.id} className="team__list-item team__list-item--pending">
                      <div className="team__pending-wrapper">
                        <img
                          className="team__member-img team__member-img--pending"
                          src={p.sender.photo ?? `/images/emma-johnson.jpg`}
                          alt={p.sender.name}
                        />

                        <h4 className="team__member-name team__member-name--pending">
                          {p.sender.name}
                        </h4>

                        <p className="team__pending-text">
                          wants to add you to 
                        </p>

                        <h4 className="team__member-name team__member-name--pending">
                          {p.team.name}
                        </h4>
                      </div>

                      <div className="team__pending-btn-wrapper">
                        <button
                          type="button"
                          className="team__pending-btn"
                          onClick={() => handleAccept(p)}
                        >
                          <img src="/images/check-green.svg" alt="button-accept" />
                        </button>
                        <button
                          type="button"
                          className="team__pending-btn"
                          onClick={() => handleReject(p.id)}
                        >
                          <img src="/images/close-red.svg" alt="button-reject" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )
            )}

          </div>

          {isModalOpen && (
            <>
              <div
                className="team__overlay"
                onClick={() => setModalOpen(false)}
              ></div>

              <div className="team__modal">
                {isTeamMembersSuccess ? '' : <button
                  type="button"
                  className="team__modal-close"
                  onClick={() => {
                    resetTeamCreation();
                  }}
                ></button>}

                {isModalOpen && confirmTeamId && confirmAction && (
                    <>
                      <h2 className="team__modal-title team__modal-title--remove">
                        {confirmAction === "delete"
                          ? `Delete ${teams.find(t => t.id === confirmTeamId)?.name}?`
                          : `Leave ${memberTeams.find(t => t.id === confirmTeamId)?.name}?`
                        }
                      </h2>
                      <p className="team__modal-description">
                        {confirmAction === "delete"
                          ? "Are you sure you want to delete this team?"
                          : "Are you sure you want to leave this team?"
                        }
                      </p>

                      <div className="team__modal-actions">
                        <button
                          type="button"
                          className="team__modal-cancel"
                          onClick={() => {
                            if (confirmAction === "delete") {
                              setTeams(prev => prev.filter(t => t.id !== confirmTeamId));
                            } else {
                              setMemberTeams(prev => prev.filter(t => t.id !== confirmTeamId));
                            }
                            resetTeamCreation();
                          }}
                        >
                          {confirmAction === "delete" ? "Delete" : "Leave"}
                        </button>

                        <button
                          type="button"
                          className="team__modal-create"
                          onClick={() => {
                            resetTeamCreation();
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}

                {!isTeamMembersSuccess && !isConfirmOpen && !confirmTeamId ? (
                  <>
                    {!isTeamNameSuccess ? (
                      <>
                        <img
                          src="/images/people.svg"
                          alt="People image"
                        />

                        <h2 className="team__modal-title">{isRenaming ? "Rename your team" : "Create your team"}</h2>

                        <label className="team__modal-label">
                          <input
                            type="text"
                            placeholder="Name your team"
                            className={`team__modal-input ${teamName.length > 30 ? "team__modal-input--error" : ""}`}
                            value={teamName}
                            onChange={(e) => {
                              const newValue = e.target.value; 
                              setTeamName(newValue); 
                              if (newValue.length > 30) {
                                setUserEmailError("Name is too long");
                              } else {
                                setUserEmailError("");
                              }
                            }}
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

                        {userEmailError !== "" &&
                          <p className="team__modal-input-message team__modal-input-message--error">
                            {userEmailError}
                          </p>
                        }

                        <div className="team__modal-actions">
                          <button type="button" className="team__modal-cancel" onClick={() => {
                            resetTeamCreation();
                          }}>
                            Cancel
                          </button>

                          <button
                            type="button"
                            className="team__modal-create"
                            onClick={() => {
                              if (isRenaming && editingTeamId) {
                                setTeams((prev) =>
                                  prev.map((t) =>
                                    t.id === editingTeamId ? { ...t, name: teamName } : t
                                  )
                                );
                                resetTeamCreation();
                                setIsRenaming(false);
                                setEditingTeamId(null);
                              } else {
                                setIsTeamNameSuccess(true);
                              }
                            }}
                            disabled={
                              teamName.trim() === "" || teamName.length > 30
                            }
                          >
                            {isRenaming ? "Rename team" : "Create team"}
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
                          <div className={classNames("team__tags", 
                          { "team__tags--error": userEmailError !== "" }
                            )}>
                            {teamMembers.map((member) => (
                              <span 
                                key={member.id} 
                                className="team__tag" 
                              >
                                {member.email}
                                <button
                                  type="button"
                                  className="team__tag-remove"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setTeamMembers(prev => prev.filter(user => user.id !== member.id));
                                  }}
                                >
                                </button>
                              </span>
                            ))}
                            <input
                              type="email"
                              placeholder={teamMembers.length === 0 ? "Enter users email" : "Type email"}
                              className={"team__modal-input team__modal-input--email"}
                              value={userEmail}
                              onChange={(e) => {
                                setUserEmail(e.target.value);
                                setUserEmailError("");
                              }}
                              onKeyDown={e => {
                                if (e.key !== "Enter") return;
                                e.preventDefault();

                                const trimmed = userEmail.trim().toLowerCase();
                                const foundUser = mockUsers.find(u => u.email.toLowerCase() === trimmed);
                                if (!foundUser) {
                                  setUserEmailError("User not found");
                                  return;
                                }

                                const actualMembers = (() => {
                                  const owner = teams.find(t => t.id === editingTeamId);
                                  if (owner) return owner.members;
                                  const member = memberTeams.find(t => t.id === editingTeamId);
                                  return member ? member.members : [];
                                })();

                                if (actualMembers.some(m => m.id === foundUser.id)) {
                                  setUserEmailError("User already in team");
                                  return;
                                }
                                if (teamMembers.some(m => m.id === foundUser.id)) {
                                  setUserEmailError("User already added");
                                  return;
                                }
                                if (teamMembers.length >= 10) {
                                  setUserEmailError("You can only add up to 10 members");
                                  return;
                                }

                                setTeamMembers(prev => [...prev, foundUser]);
                                setUserEmail("");
                                setUserEmailError("");
                              }}

                              style={{
                                marginBlock: teamMembers.length < 2 ? "-9px" : "0",
                              }}
                            />
                          </div>
                        

                        {userEmailError !== "" ? (
                          <p className="team__modal-input-message team__modal-input-message--error">
                            {userEmailError}
                          </p>
                        ) : (
                          <p className="team__modal-input-message">
                            You can add up to 10 people at a time
                            {filteredSuggestions.length > 0 && (
                            <ul className="team__modal-suggestions">
                              {filteredSuggestions.map((user) => (
                                <li
                                  key={user.id}
                                  className="team__modal-suggestion"
                                  onClick={() => {
                                    const isAlreadyAdded = teamMembers.some(member => member.id === user.id);

                                    if (isAlreadyAdded) {
                                      setUserEmailError("User already added");
                                      return;
                                    }

                                    if (teamMembers.length >= 10) {
                                      setUserEmailError("You can only add up to 10 members");
                                      return;
                                    }

                                    setTeamMembers((prev) => [...prev, user]);
                                    setUserEmail("");
                                    setSuggestedUsers([]);
                                    setUserEmailError("");
                                  }}
                                >
                                  <img className="team__modal-suggestion-avatar" src="" alt="Ava" />
                                  <div className="team__modal-suggestion-info">
                                    <h5 className="team__modal-suggestion-name">{user.name}</h5>
                                    <p className="team__modal-suggestion-email">{user.email}</p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                          </p>
                        )}

                        <div className="team__modal-actions">
                          <button 
                            type="button" 
                            className="team__modal-cancel"
                            onClick={() => {
                              resetTeamCreation();
                              setModalOpen(false);
                            }}
                          >
                            Cancel
                          </button>

                          <button
                            type="button"
                            className="team__modal-create"
                            disabled={teamMembers.length === 0}
                            onClick={() => {
                              if (editingTeamId) {
                                const isOwner = teams.some(t => t.id === editingTeamId);
                                if (isOwner) {
                                  setTeams(prev =>
                                    prev.map(t =>
                                      t.id === editingTeamId
                                        ? { ...t, members: [...t.members, ...teamMembers] }
                                        : t
                                    )
                                  );
                                } else {
                                  setMemberTeams(prev =>
                                    prev.map(t =>
                                      t.id === editingTeamId
                                        ? { ...t, members: [...t.members, ...teamMembers] }
                                        : t
                                    )
                                  );
                                }

                                resetTeamCreation();
                              } else {
                                setTeams(prev => [
                                  ...prev,
                                  {
                                    id: `${Date.now()}`, 
                                    name: teamName,
                                    members: teamMembers,
                                  },
                                ]);
                                setIsTeamMembersSuccess(true);
                              }
                            }}
                          >
                            Add members
                          </button>


                        </div>
                      </>
                    )}
                  </>
                ) : isConfirmOpen ? (
                      <>
                        <h2 className="team__modal-title team__modal-title--remove">{`Remove 
                          ${
                            teams
                              .find(team => team.id === expandedTeamId)
                              ?.members
                              .find(member => member.email === userEmail)
                              ?.name || userEmail
                          }?`}
                        </h2>
                        <p className="team__modal-description">Are you sure you want to remove this person from the team?</p>
                        
                        <div className="team__modal-actions">
                          <button
                            type="button"
                            className="team__modal-cancel"
                            onClick={() => {
                              setTeams(prevTeams =>
                                prevTeams.map(t =>
                                  t.id === expandedTeamId
                                    ? {
                                        ...t,
                                        members: t.members.filter(m => m.email !== userEmail),
                                      }
                                    : t
                                )
                              );
                              setUserEmail('');
                              setIsConfirmOpen(false);
                              setModalOpen(false);
                            }}
                          >
                            Remove
                          </button>

                          <button
                            type="button"
                            className="team__modal-create"
                            onClick={() => {
                              setIsConfirmOpen(false);
                              setModalOpen(false);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : !confirmTeamId && !confirmAction && (
                  <>
                    <img src="/images/done-icon.svg" alt="Done icon" className="team__modal-done"/>

                    <h2 className="team__modal-title team__modal-title--success">
                      Your team was successfully created
                    </h2>
                    <p className="team__modal-description">Users will join the team by accepting your request</p>

                    <button type="button" className="team__modal-continue" onClick={() => resetTeamCreation()}>
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
