import "./ChatPage.scss";
import { ProfilePopup } from "../../components/ProfilePopup";
import { PageLayout } from "../PageLayout";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { ChannelsList } from "../../components/ChannelsList/ChannelsList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchChannels } from "../../store/features/channelSlice";
import { fetchMessages } from "../../store/features/messageSlice";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useRef } from "react";
import { selectUnreadCountByCategory } from "../../store/features/messageSlice";
import { DirectMessages } from "../../components/DirectMessagesList";
import { fetchDirectMessages } from "../../store/features/directMessagesSlice";
import { TeamsList } from "../../components/TeamsList";
import { fetchTeams } from "../../store/features/teamsSlice";
import { User } from "../../types/ProductType";

type Props = {};

const BUTTONS = [
  { id: "channels", label: "Channels" },
  { id: "team", label: "Team chats" },
  { id: "direct", label: "Direct messages" },
];

const loggedUser = {
  id: 0,
  name: "Admin",
  username: "admin",
  scorePoints: 90,
  email: "admin.admin@example.com",
  role: "admin",
  photo: null,
  password: "admin",
};

export const ChatPage: React.FC<Props> = () => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<
    { file: File; url: string }[]
  >([]);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [pickedUser, setPickedUser] = useState<User | null>(null);

  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const prevMessagesLength = useRef(0);

  const channels = useAppSelector((state) => state.channels.channels);
  const messages = useAppSelector((state) => state.messages.messages);
  const directMessages = useAppSelector((state) => state.directMessages.directMessages);
  const teams = useAppSelector((state) => state.teams.value);
  const users = useAppSelector((state) => state.users.value);

  const actualMessages = messages.filter((msg) => {
    if (activeChannelId) {
      return msg.to === activeChannelId;
    }
    return false;
  });

  const assignedTeams = teams.filter((team) => {
    return team.memberIds.includes(loggedUser.id);
  });

  const toggleMenu = (id: number) => {
    if (editingMessageId === id) {
      if (textareaRef.current) {
        textareaRef.current.value = "";
        textareaRef.current.focus();
        setEditingMessageId(null);
      }
    } else {
      setOpenMenuId(openMenuId === id ? null : id);
    }
  };

  const toggleButton = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
    e.target.value = "";
  };

  const handleEditMessage = (id: number) => {
    const msg = actualMessages.find((m) => m.id === id);
    if (msg && textareaRef.current) {
      textareaRef.current.value = msg.content;
      textareaRef.current.focus();
      setEditingMessageId(id);
      setOpenMenuId(null);
    }
  };

  const handleDirectMessage = (user: User) => {
    setIsPopupOpen(false);
    setPickedUser(null);
    setActiveChannelId(`${user.username}`);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
    dispatch(fetchDirectMessages());
    dispatch(fetchTeams());
  }, [dispatch]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;

      if (
        target.closest(".chat-page__message-menu") ||
        target.closest(".chat-page__message-info")
      ) {
        return;
      }

      setOpenMenuId(null);
    }

    if (openMenuId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;

      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(target) &&
        !target.closest(".chat-page__send-button")
      ) {
        setShowEmojiPicker(false);
      }
    }

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  useEffect(() => {
    if (
      messagesContainerRef.current &&
      actualMessages.length > prevMessagesLength.current
    ) {
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
    prevMessagesLength.current = actualMessages.length;
  }, [actualMessages]);

  return (
    <>
      <PageLayout pageTitle="Chat" isLoading={false} errorMessage={""}>
        <div className="chat-page">
          <section className="chat-page__menu">
            <h1 className="chat-page__menu-header">Messages</h1>
            <div className="chat-page__boxes">
              <ul className="chat-page__list">
                {BUTTONS.map(({ id, label }) => {
                  const unreadCount = useAppSelector(
                    selectUnreadCountByCategory(id)
                  );
                  return (
                    <li key={id} className="chat-page__element">
                      <div className="chat-page__element-header">
                        <button
                          type="button"
                          className={classNames({
                            "chat-page__element-button": !expandedSections[id],
                            "chat-page__element-button--clicked":
                              expandedSections[id],
                          })}
                          onClick={() => toggleButton(id)}
                        />

                        {label}
                        {unreadCount > 0 && (
                          <span className="chat-page__element-info">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                      {id === "channels" && expandedSections["channels"] && (
                        <ChannelsList onChannelSelect={setActiveChannelId} activeButtonId={activeChannelId||''}/>
                      )}
                      {id === "direct" && expandedSections["direct"] && (
                        <DirectMessages onDirectSelect={setActiveChannelId} directMessages={directMessages} activeButtonId={activeChannelId||''}/>
                      )}
                      {id === "team" &&
                        expandedSections["team"] &&
                        assignedTeams.length > 0 && (
                          <TeamsList
                            onDirectSelect={setActiveChannelId}
                            teams={assignedTeams}
                            activeButtonId={activeChannelId||''}
                          />
                        )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          {activeChannelId === null ? (
            <section className="chat-page__window--empty">
              <div className="chat-page__window--empty-content">
                <img
                  src="/public/images/scientist-boy-chat.svg"
                  className="chat-page__photo"
                  alt="No chat selected"
                />
                <div className="chat-page__text">
                  <h1 className="chat-page__text-header">
                    No chat is selected
                  </h1>
                  <p className="chat-page__text-paragraph">
                    Select a chat to see messages
                  </p>
                </div>
              </div>
            </section>
          ) : (
            <section className="chat-page__window">
              <div className="chat-page__window-label">
                {channels.find((c) => c.id === activeChannelId)?.label}
                {assignedTeams.find((t) => t.id === activeChannelId)?.name}
                {directMessages.find((d) => d.userName === activeChannelId)?.name}
              </div>

              <div className="chat-page__messages" ref={messagesContainerRef}>
                {actualMessages.length > 0 ? (
                  actualMessages.map(
                    ({ id, fromUserName, content, time }, index) => {
                      const prevMessage = actualMessages[index - 1];
                      const showSenderInfo =
                        !prevMessage ||
                        prevMessage.fromUserName !== fromUserName;
                      return (
                        <div
                          key={`${id}-${index}`}
                          className={classNames("chat-page__message", {
                            "chat-page__message--left":
                              fromUserName !== loggedUser.name,
                            "chat-page__message--right":
                              fromUserName === loggedUser.name,
                            "chat-page__message--grouped": !showSenderInfo,
                          })}
                        >
                          <div className="chat-page__message-content">
                            <div className="chat-page__message-label">
                              <div
                                className="chat-page__message-user-info"
                                onClick={() => {
                                  const user = users.find(u => u.name === fromUserName)
                                  setPickedUser(user || null);
                                  setIsPopupOpen(true);
                                }}
                              >
                                <img
                                  src="/public/images/avatar_by_default.svg"
                                  alt="avatar"
                                  className="chat-page__avatar"
                                />
                                <span className="chat-page__name">
                                  {fromUserName}
                                </span>
                              </div>
                              <div className="chat-page__message-time-info">
                                <span className="chat-page__message-time">
                                  {time}
                                </span>
                                {editingMessageId === id ? (
                                  <button
                                    className="chat-page__message-info"
                                    type="button"
                                    onClick={() => toggleMenu(id)}
                                    aria-expanded={openMenuId === id}
                                    aria-haspopup="true"
                                  >
                                    <img
                                      src="/public/images/close-red.svg"
                                      alt="close"
                                    />
                                  </button>
                                ) : fromUserName === loggedUser.name ? (
                                  <button
                                    className="chat-page__message-info"
                                    type="button"
                                    onClick={() => toggleMenu(id)}
                                    aria-expanded={openMenuId === id}
                                    aria-haspopup="true"
                                  >
                                    <img
                                      src="/public/images/three-dots.svg"
                                      alt="menu"
                                    />
                                  </button>
                                ) : null}

                                {openMenuId === id && (
                                  <ul
                                    className="chat-page__message-menu"
                                    ref={menuRef}
                                  >
                                    <li onClick={() => handleEditMessage(id)}>
                                      <img
                                        src="/public/images/edit-message-icon.svg"
                                        alt="edit"
                                        className="chat-page__message-menu-edit"
                                      />
                                      Edit message
                                    </li>
                                    <li>
                                      <img
                                        src="/public/images/delete-message-icon.svg"
                                        alt="delete"
                                        className="chat-page__message-menu-delete"
                                      />
                                      Delete message
                                    </li>
                                  </ul>
                                )}
                              </div>
                            </div>
                            <div
                              className={classNames("chat-page__bubble", {
                                "chat-page__bubble--gray":
                                  fromUserName !== loggedUser.name,
                              })}
                            >
                              {editingMessageId === id ? "Editing..." : content}
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )
                ) : (
                  <div className="no-message">No messages yet</div>
                )}
              </div>

              <div className="chat-page__input">
                {attachedFiles.length > 0 && (
                  <div className="chat-page__selected-attachments">
                    {attachedFiles.map(({ file, url }, index) => (
                      <div
                        key={index}
                        className={
                          file.type.startsWith("image/")
                            ? "attachment-img"
                            : "attachment-pdf"
                        }
                      >
                        {file.type.startsWith("image/") ? (
                          <img
                            src={url}
                            alt="preview"
                            className="attachment-img--item"
                          />
                        ) : (
                          <div className="attachment-pdf">
                            <img
                              src="/images/pdf-icon2.svg"
                              alt="preview"
                              className="attachment-pdf--item"
                            />
                            {file.name}
                          </div>
                        )}

                        <button
                          className={
                            file.type.startsWith("image/")
                              ? "attachment-img__remove"
                              : "attachment-pdf__remove"
                          }
                          onClick={() => {
                            setAttachedFiles((prev) =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="chat-page__aaa">
                  <div className="chat-page__additional-buttons">
                    <button
                      className="chat-page__send-button"
                      type="button"
                      onClick={() => setShowEmojiPicker((prev) => !prev)}
                    >
                      <img src="/public/images/emoji-icon.svg" alt="emoji" />
                    </button>
                    {showEmojiPicker && (
                      <div
                        ref={emojiPickerRef}
                        style={{
                          position: "absolute",
                          bottom: "60px",
                          left: "16px",
                          zIndex: 1000,
                        }}
                      >
                        <Picker
                          data={data}
                          onEmojiSelect={(emoji: any) => {
                            if (textareaRef.current) {
                              const textarea = textareaRef.current;
                              const start = textarea.selectionStart;
                              const end = textarea.selectionEnd;
                              const text = textarea.value;
                              const emojiChar = emoji.native;

                              textarea.value =
                                text.slice(0, start) +
                                emojiChar +
                                text.slice(end);
                              textarea.selectionStart = textarea.selectionEnd =
                                start + emojiChar.length;
                              textarea.focus();
                            }
                            setShowEmojiPicker(false);
                          }}
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*,.pdf,.doc,.docx,.txt"
                      style={{ display: "none" }}
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                    <button
                      className="chat-page__send-button"
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <img
                        src="/public/images/attachments-icon.svg"
                        alt="attachments"
                      />
                    </button>
                  </div>

                  <textarea
                    placeholder="Type your message here"
                    className="chat-page__input-field"
                    ref={textareaRef}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "auto";
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                  ></textarea>

                  <button className="chat-page__send-button">
                    <img src="/public/images/send-icon.svg" alt="send" />
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
      </PageLayout>
      {isPopupOpen && pickedUser && (
        <ProfilePopup
          setIsOpen={setIsPopupOpen}
          user={pickedUser}
          onDirectMessage={handleDirectMessage}
        />
      )}
    </>
  );
};
