import React, { useEffect, useMemo, useState } from "react";
import { PageLayout } from "../PageLayout";
import "./Team.scss";
import classNames from "classnames";
import { User } from "../../types/ProductType";
import { TeamType, Pending } from "../../types/TeamType";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  bulkAddMembers,
  removeMember,
  createTeam,
  renameTeam,
  deleteTeam,
  leaveTeam,
} from "../../store/features/teamsSlice";
import {
  acceptPendingAndAddMember,
  rejectPending,
  selectPendingForUser,
} from "../../store/features/pendingSlice";

export const Team: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((s) => s.user.value);
  const currentUserId = currentUser?.id ?? 1;

  const teamsFromStore = useAppSelector((s) => s.teams.value);
  const usersFromStore = useAppSelector((s) => s.users.value);
  const pendingFromStore = useAppSelector((s) => selectPendingForUser(s));

  // UI state
  const [errorMessage] = useState("");
  const [isLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"myTeams" | "pending">("myTeams");
  const [isModalOpen, setModalOpen] = useState(false);
  const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);

  // dropdown open state
  const [optionsOpenTeamId, setOptionsOpenTeamId] = useState<string | null>(null);

  // modal flow state
  type ModalMode = "create" | "invite" | "rename" | "delete" | "leave" | "removeMember" | "success" | null;
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<User | null>(null);

  // form state
  const [teamName, setTeamName] = useState("");
  const [pendingNewTeam, setPendingNewTeam] = useState<TeamType | null>(null);
  const [teamMembersSelection, setTeamMembersSelection] = useState<User[]>([]);
  const [userEmail, setUserEmail] = useState("");
  const [userEmailError, setUserEmailError] = useState("");
  const [teamNameError, setTeamNameError] = useState("");
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([]);

  const teamsWithMembers = useMemo(() => {
    return teamsFromStore.map((team) => ({
      ...team,
      members: (team.memberIds ?? [])
        .map((id) => usersFromStore.find((u) => u.id === id))
        .filter((u): u is User => Boolean(u)),
    }));
  }, [teamsFromStore, usersFromStore]);

  const ownerTeamsWithMembers = useMemo(
    () => teamsWithMembers.filter((t) => t.ownerId === currentUserId),
    [teamsWithMembers, currentUserId]
  );
  const memberTeamsWithMembers = useMemo(
    () => teamsWithMembers.filter((t) => (t.memberIds ?? []).includes(currentUserId) && t.ownerId !== currentUserId),
    [teamsWithMembers, currentUserId]
  );

  useEffect(() => {
    const trimmed = userEmail.trim().toLowerCase();

    if (trimmed.length === 0) {
      setSuggestedUsers([]);
      setUserEmailError("");
      return;
    }

    const id = setTimeout(() => {
      let found = usersFromStore.filter((u) =>
        u.email.toLowerCase().includes(trimmed)
      );

      if (selectedTeamId) {
        const currentTeamMembers =
          teamsFromStore.find((t) => t.id === selectedTeamId)?.memberIds ?? [];
        found = found.filter((u) => !currentTeamMembers.includes(u.id));
      }

      found = found.filter(
        (u) => !teamMembersSelection.some((addedUser) => addedUser.id === u.id) &&
        u.id !== currentUserId
      );

      setSuggestedUsers(found);
      console.log(found)

      if (found.length === 0) {
        setUserEmailError(
          trimmed.includes("@")
            ? "User not found"
            : "Please check that email address is indicated correctly"
        );
      } else {
        setUserEmailError("");
      }
    }, 500);

    return () => clearTimeout(id);
  }, [userEmail, usersFromStore, teamsFromStore, selectedTeamId, teamMembersSelection, currentUserId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (target.closest(".team__options") || target.closest(".team__options-menu")) {
        return;
      }
      setOptionsOpenTeamId(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pendingForDisplay = pendingFromStore.map((p) => ({
    ...p,
    team: teamsFromStore.find((t) => t.id === p.teamId) ?? undefined,
    sender: usersFromStore.find((u) => u.id === p.senderId) ?? undefined,
  }));

  const handleAcceptPending = (p: Pending) => {
    dispatch(acceptPendingAndAddMember({ id: p.id }));
  };

  const handleRejectPending = (id: string) => {
    dispatch(rejectPending({ id }));
  };

  const openCreateModal = () => {
    setModalMode("create");
    setTeamName("");
    setTeamMembersSelection([]);
    setUserEmail("");
    setUserEmailError("");
    setModalOpen(true);
    setSelectedTeamId(null);
    setOptionsOpenTeamId(null);
  };

  const openInviteModal = (teamId: string) => {
    setModalMode("invite");
    setSelectedTeamId(teamId);
    setTeamMembersSelection([]);
    setUserEmail("");
    setUserEmailError("");
    setModalOpen(true);
    setOptionsOpenTeamId(null);
  };

  const openRenameModal = (teamId: string) => {
    const t = teamsFromStore.find((x) => x.id === teamId);
    setModalMode("rename");
    setSelectedTeamId(teamId);
    setTeamName(t?.name ?? "");
    setModalOpen(true);
    setOptionsOpenTeamId(null);
  };

  const openDeleteModal = (teamId: string) => {
    setModalMode("delete");
    setSelectedTeamId(teamId);
    setModalOpen(true);
    setOptionsOpenTeamId(null);
  };

  const openLeaveModal = (teamId: string) => {
    setModalMode("leave");
    setSelectedTeamId(teamId);
    setModalOpen(true);
    setOptionsOpenTeamId(null);
  };

  const openRemoveMemberModal = (teamId: string, member: User) => {
    setModalMode("removeMember");
    setSelectedTeamId(teamId);
    setSelectedMember(member);
    setModalOpen(true);
    setOptionsOpenTeamId(null);
  };

  const confirmModalAction = () => {
    if (!modalMode) return;

    if (modalMode === "create") {
      const newTeamId = `${Date.now()}`;
      const memberIds = [currentUserId];

      const newTeam: TeamType = {
        id: newTeamId,
        name: teamName.trim(),
        ownerId: currentUserId,
        memberIds,
        createdAt: new Date().toISOString(),
      };

      setPendingNewTeam(newTeam);
      setSelectedTeamId(newTeamId);
      setModalMode("invite");
      setTeamMembersSelection([]);
      setTeamName(teamName);
      setTeamNameError("");
      return;
    }

    if (modalMode === "invite" && selectedTeamId) {
      if (!pendingNewTeam) return;

      dispatch(createTeam(pendingNewTeam));

      const userIds = teamMembersSelection.map((u) => u.id);
      if (userIds.length > 0) {
        dispatch(bulkAddMembers({ teamId: selectedTeamId, userIds }));
      }

      setPendingNewTeam(null); 

      if (pendingNewTeam) {
        setModalMode("success");
      }

      return;
    }


    if (modalMode === "rename" && selectedTeamId) {
      dispatch(renameTeam({ teamId: selectedTeamId, name: teamName.trim() }));
      setModalOpen(false);
      setModalMode(null);
      setTeamName("");
      setSelectedTeamId(null);
      return;
    }

    if (modalMode === "delete" && selectedTeamId) {
      dispatch(deleteTeam({ teamId: selectedTeamId }));
      setModalOpen(false);
      setModalMode(null);
      setSelectedTeamId(null);
      return;
    }

    if (modalMode === "leave" && selectedTeamId) {
      dispatch(leaveTeam({ teamId: selectedTeamId, userId: currentUserId }));
      setModalOpen(false);
      setModalMode(null);
      setSelectedTeamId(null);
      return;
    }

    if (modalMode === "removeMember" && selectedTeamId && selectedMember) {
      dispatch(removeMember({ teamId: selectedTeamId, userId: selectedMember.id }));
      setModalOpen(false);
      setModalMode(null);
      setSelectedMember(null);
      setSelectedTeamId(null);
      return;
    }
  };

  const addSuggestedUserToSelection = (user: User) => {
    if (teamMembersSelection.some((m) => m.id === user.id)) {
      setUserEmailError("User already added");
      return;
    }
    if (teamMembersSelection.length >= 10) {
      setUserEmailError("You can only add up to 10 members");
      return;
    }

    setTeamMembersSelection((prev) => [...prev, user]);
    setUserEmail("");
    setSuggestedUsers([]);
    setUserEmailError("");
  };


  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const trimmed = userEmail.trim().toLowerCase();

    const found = usersFromStore.find((u) => u.email.toLowerCase() === trimmed);

    if (!found) {
      setUserEmailError("User not found");
      return;
    }

    if (found.id === currentUserId) {
      setUserEmailError("User already added");
      return;
    }

    if (teamMembersSelection.some((m) => m.id === found.id)) {
      setUserEmailError("User already added");
      return;
    }

    if (selectedTeamId) {
      const alreadyInTeam = (
        teamsFromStore.find((t) => t.id === selectedTeamId)?.memberIds ?? []
      ).includes(found.id);

      if (alreadyInTeam) {
        setUserEmailError("User already in team");
        return;
      }
    }

    if (!filteredSuggestions.some((u) => u.id === found.id)) {
      setUserEmailError("User not found");
      return;
    }

    if (teamMembersSelection.length >= 10) {
      setUserEmailError("You can only add up to 10 members");
      return;
    }

    addSuggestedUserToSelection(found);
  };


  const filteredSuggestions = suggestedUsers.filter((u) => {
    const alreadySelected = teamMembersSelection.some((m) => m.id === u.id);
    const alreadyInTeam = selectedTeamId ? (teamsFromStore.find((t) => t.id === selectedTeamId)?.memberIds ?? []).includes(u.id) : false;
    const isOwner = u.id === currentUserId;
    return !alreadySelected && !alreadyInTeam && !isOwner;
  });


  return (
    <PageLayout pageTitle="Team management" isLoading={isLoading} errorMessage={errorMessage}>
      {!isLoading && !errorMessage && (
        <div className="team">
          <div className="team__header">
            <ul className="team__tabs">
              <li className="team__tab">
                <button className={classNames("team__tab-button", { "team__tab-button--active": activeTab === "myTeams" })} onClick={() => setActiveTab("myTeams")}>
                  My teams
                </button>
              </li>
              <li className="team__tab">
                <button className={classNames("team__tab-button", { "team__tab-button--active": activeTab === "pending" })} onClick={() => setActiveTab("pending")}>
                  Pending {pendingFromStore.length > 0 && <span className="team__tab-button-info">{pendingFromStore.length}</span>}
                </button>
              </li>
            </ul>

            <button className="team__create-btn" onClick={openCreateModal}>
              Create team
            </button>
          </div>

          <div className="team__content">
            {activeTab === "myTeams" && (
              <>
                {ownerTeamsWithMembers.length > 0 && (
                  <div className="team__list-block">
                    <h3 className="team__list-title">Owner</h3>
                    <ul className="team__list">
                      {ownerTeamsWithMembers.map((team) => (
                        <React.Fragment key={team.id}>
                          <li className="team__list-item">
                            <button
                              type="button"
                              className={classNames("team__list-item-button", { "team__list-item-button--open": expandedTeamId === team.id })}
                              onClick={() => setExpandedTeamId((p) => (p === team.id ? null : team.id))}
                            />
                            {team.name}
                            <button
                              className={classNames("team__options", { "team__options--active": optionsOpenTeamId === team.id })}
                              onClick={(e) => { e.stopPropagation(); setOptionsOpenTeamId((prev) => (prev === team.id ? null : team.id)); }}
                              aria-expanded={optionsOpenTeamId === team.id}
                              aria-controls={`team-options-${team.id}`}
                            />
                            {optionsOpenTeamId === team.id && (
                              <ul id={`team-options-${team.id}`} className="team__options-menu">
                                <li className="team__options-menu-option" onClick={() => openInviteModal(team.id)}>
                                  <img src="/images/userplus.svg" alt="" />
                                  <button className="team__options-button">Invite members</button>
                                </li>
                                <li className="team__options-menu-option" onClick={() => openRenameModal(team.id)}>
                                  <img src="/images/pencil.svg" alt="" />
                                  <button className="team__options-button">Rename team</button>
                                </li>
                                <li className="team__options-menu-option" onClick={() => openDeleteModal(team.id)}>
                                  <img src="/images/trash.svg" alt="" />
                                  <button className="team__options-button">Delete team</button>
                                </li>
                              </ul>
                            )}
                          </li>

                          {expandedTeamId === team.id && (
                            <ul className="team__members">
                              {team.members
                                .sort((a, b) => (b.id === team.ownerId ? 1 : 0) - (a.id === team.ownerId ? 1 : 0))
                                .map((member) => (
                                  <li key={member.id} className="team__member">
                                    <img className="team__member-img" src={member.photo ?? `/images/emma-johnson.jpg`} alt={member.name} />
                                    <h4 className="team__member-name">{member.name}</h4>
                                    <span className="team__member-role">
                                      {member.id === team.ownerId ? "Owner" :  "Member"}
                                    </span>
                                    {member.id !== team.ownerId ? <button type="button" className="team__member-delete" onClick={() => openRemoveMemberModal(team.id, member)} /> : ''}
                                  </li>
                                ))}
                            </ul>
                          )}
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                )}

                {memberTeamsWithMembers.length > 0 && (
                  <div className="team__list-block">
                    <h3 className="team__list-title">Member</h3>
                    <ul className="team__list">
                      {memberTeamsWithMembers.map((team) => (
                        <React.Fragment key={team.id}>
                          <li className="team__list-item">
                            <button
                              type="button"
                              className={classNames("team__list-item-button", { "team__list-item-button--open": expandedTeamId === team.id })}
                              onClick={() => setExpandedTeamId((p) => (p === team.id ? null : team.id))}
                            />
                            {team.name}
                            <button
                              className={classNames("team__options", { "team__options--active": optionsOpenTeamId === team.id })}
                              onClick={(e) => { e.stopPropagation(); setOptionsOpenTeamId((prev) => (prev === team.id ? null : team.id)); }}
                              aria-expanded={optionsOpenTeamId === team.id}
                              aria-controls={`team-options-${team.id}`}
                            />
                            {optionsOpenTeamId === team.id && (
                              <ul id={`team-options-${team.id}`} className="team__options-menu">
                                <li className="team__options-menu-option" onClick={() => openInviteModal(team.id)}>
                                  <img src="/images/userplus.svg" alt="" />
                                  <button className="team__options-button">Invite members</button>
                                </li>
                                <li className="team__options-menu-option" onClick={() => openLeaveModal(team.id)}>
                                  <img src="/images/logout.svg" alt="" />
                                  <button className="team__options-button">Leave team</button>
                                </li>
                              </ul>
                            )}
                          </li>

                          {expandedTeamId === team.id && (
                            <ul className="team__members">
                              {team.members
                                .sort((a, b) => (b.id === team.ownerId ? 1 : 0) - (a.id === team.ownerId ? 1 : 0))
                                .map((member) => (
                                  <li key={member.id} className="team__member">
                                    <img className="team__member-img" src={member.photo ?? `/images/emma-johnson.jpg`} alt={member.name} />
                                    <h4 className="team__member-name">{member.name}</h4>
                                    <span className="team__member-role">{member.id === team.ownerId ? "Owner" :  "Member"}</span>
                                  </li>
                                ))}
                            </ul>
                          )}
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                )}

                {ownerTeamsWithMembers.length === 0 && memberTeamsWithMembers.length === 0 && (
                  <>
                    <img className="team__content-img" src="/images/no-teams.svg" alt="no pendings" />
                    <p className="team__content-message">No teams were added</p>
                  </>
                )}
              </>
            )}

            {activeTab === "pending" && (
              <>
                {pendingForDisplay.length === 0 ? (
                  <>
                    <img className="team__content-img" src="/images/no-teams.svg" alt="no pendings" />
                    <p className="team__content-message">No pending invitation</p>
                  </>
                ) : (
                  <ul className="team__list">
                    {pendingForDisplay.map((p) => (
                      <li key={p.id} className="team__list-item team__list-item--pending">
                        <div className="team__pending-wrapper">
                          <img className="team__member-img team__member-img--pending" src={p.sender?.photo ?? `/images/emma-johnson.jpg`} alt={p.sender?.name ?? "User"} />
                          <h4 className="team__member-name team__member-name--pending">{p.sender?.name ?? "Unknown"}</h4>
                          <p className="team__pending-text">wants to add you to</p>
                          <h4 className="team__member-name team__member-name--pending">{p.team?.name ?? "Unknown team"}</h4>
                        </div>

                        <div className="team__pending-btn-wrapper">
                          <button type="button" className="team__pending-btn" onClick={() => handleAcceptPending(p)}>
                            <img src="/images/check-green.svg" alt="button-accept" />
                          </button>
                          <button type="button" className="team__pending-btn" onClick={() => handleRejectPending(p.id)}>
                            <img src="/images/close-red.svg" alt="button-reject" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>

          {isModalOpen && (
            <>
              <div className="team__overlay" onClick={() => { setModalOpen(false); setModalMode(null); setSelectedTeamId(null); }} />

              <div className="team__modal" role="dialog" aria-modal="true">
                <button type="button" className="team__modal-close" onClick={() => { 
                  setModalOpen(false);
                  setModalMode(null);
                  setTeamName("");
                  setTeamNameError("");
                  setTeamMembersSelection([]);
                  setUserEmail("");
                  setUserEmailError("");
                }} aria-label="Close"></button>

                {(modalMode === "create" || modalMode === "rename") && (
                  <>
                    <img src="/images/people.svg" alt="People" />
                    <h2 className="team__modal-title">{modalMode === "rename" ? "Rename your team" : "Create your team"}</h2>

                    <label className="team__modal-label">
                      <input
                        type="text"
                        placeholder="Name your team"
                        className={classNames("team__modal-input", { "team__modal-input--error": teamName.length > 30 })}
                        value={teamName}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setTeamName(newValue);

                          if (newValue.length > 30) {
                            setTeamNameError("Name is too long");
                          } else {
                            setTeamNameError("");
                          }
                        }}
                      />
                      
                      <span className={classNames("team__modal-input-counter", { "team__modal-input-counter--error": teamName.length > 30 })}>{teamName.length}/30</span>
                      {teamNameError && (
                        <p className="team__modal-input-message team__modal-input-message--error">
                          {teamNameError}
                        </p>
                      )}
                    </label>

                    <div className="team__modal-actions">
                      <button type="button" className="team__modal-cancel" onClick={() => { setModalOpen(false); setModalMode(null); setSelectedTeamId(null); }}>Cancel</button>
                      <button type="button" className="team__modal-create" disabled={teamName.trim() === "" || teamName.length > 30} onClick={confirmModalAction}>
                        {modalMode === "rename" ? "Rename team" : "Create team"}
                      </button>
                    </div>
                  </>
                )}

                {modalMode === "invite" && (
                  <>
                    <img src="/images/avatars.svg" alt="Avatars" />
                    <h2 className="team__modal-title">
                      {teamsFromStore.find(t => t.id === selectedTeamId)?.name ?? teamName}
                    </h2>

                    <div className={classNames("team__tags", { "team__tags--error": !!userEmailError })}>
                      {teamMembersSelection.map((m) => (
                        <span key={m.id} className="team__tag">
                          {m.email}
                          <button
                            type="button"
                            className="team__tag-remove"
                            onClick={() => setTeamMembersSelection((prev) => prev.filter((x) => x.id !== m.id))}
                            aria-label={`Remove ${m.email}`}
                          >
                            
                          </button>
                        </span>
                      ))}

                      <input
                        type="email"
                        placeholder={teamMembersSelection.length === 0 ? "Enter users email" : "Type email"}
                        className="team__modal-input team__modal-input--email"
                        value={userEmail}
                        onChange={(e) => {
                          setUserEmail(e.target.value);
                          setUserEmailError("");
                        }}
                        onKeyDown={handleEmailKeyDown}
                        aria-label="User email"
                      />
                    </div>

                    {userEmailError ? (
                      <p className="team__modal-input-message team__modal-input-message--error">
                        {userEmailError}
                      </p>
                    ) : (
                      <p className="team__modal-input-message">
                        You can add up to 10 people at a time
                        {filteredSuggestions.length > 0 && (
                          <ul className="team__modal-suggestions">
                            {filteredSuggestions.map((u) => (
                              <li key={u.id} className="team__modal-suggestion" onClick={() => addSuggestedUserToSelection(u)}>
                                <img className="team__modal-suggestion-avatar" src={u.photo ?? "/images/default-avatar.svg"} alt="Ava" />
                                <div className="team__modal-suggestion-info">
                                  <h5 className="team__modal-suggestion-name">{u.name}</h5>
                                  <p className="team__modal-suggestion-email">{u.email}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </p>
                    )}

                    <div className="team__modal-actions">
                      <button type="button" className="team__modal-cancel" onClick={() => { setModalOpen(false); setModalMode(null); setSelectedTeamId(null); }}>
                        Cancel
                      </button>

                      <button type="button" className="team__modal-create" disabled={teamMembersSelection.length === 0} onClick={confirmModalAction}>
                        Add members
                      </button>
                    </div>
                  </>
                )}

                {modalMode === "success" && (
                  <>
                    <img src="/images/done-icon.svg" alt="Done icon" className="team__modal-done" />
                    <h2 className="team__modal-title team__modal-title--success">Your team was successfully created</h2>
                    <p className="team__modal-description">Users will join the team by accepting your request</p>

                    <div className="team__modal-actions">
                      <button type="button" className="team__modal-create" onClick={() => {
                        setModalOpen(false);
                        setModalMode(null);
                        setSelectedTeamId(null);
                        setTeamName("");
                        setTeamMembersSelection([]);
                        setUserEmail("");
                      }}>Continue</button>
                    </div>
                  </>
                )}

                {(modalMode === "delete" || modalMode === "leave" || modalMode === "removeMember") && (
                  <>
                    <h2 className="team__modal-title team__modal-title--remove">
                      {modalMode === "delete" && `Delete ${teamsFromStore.find((t) => t.id === selectedTeamId)?.name}?`}
                      {modalMode === "leave" && `Leave ${teamsFromStore.find((t) => t.id === selectedTeamId)?.name}?`}
                      {modalMode === "removeMember" && `Remove ${selectedMember?.name ?? ""}?`}
                    </h2>
                    <p className="team__modal-description">
                      {modalMode === "delete" && "Are you sure you want to delete this team?"}
                      {modalMode === "leave" && "Are you sure you want to leave this team?"}
                      {modalMode === "removeMember" && "Are you sure you want to remove this person from the team?"}
                    </p>

                    <div className="team__modal-actions">
                      <button type="button" className="team__modal-cancel" onClick={confirmModalAction}>
                        {modalMode === "delete" ? "Delete" : modalMode === "leave" ? "Leave" : "Remove"}
                      </button>
                      <button type="button" className="team__modal-create" onClick={() => { setModalOpen(false); setModalMode(null); setSelectedTeamId(null); }}>Cancel</button>
                    </div>
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
