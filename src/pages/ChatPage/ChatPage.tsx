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

type Props = {};

const BUTTONS = [
  { id: "channels", label: "Channels" },
  { id: "team", label: "Team chats" },
  { id: "direct", label: "Direct messages" },
];

export const ChatPage: React.FC<Props> = () => {
  const [clickedButtons, setClickedButtons] = useState<Record<string, boolean>>(
    {}
  );
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const channels = useAppSelector((state) => state.channels.channels);
  const messages = useAppSelector((state) => state.messages.messages);

  const toggleButton = (id: string) => {
    setClickedButtons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);
    }
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

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
                            "chat-page__element-button": !clickedButtons[id],
                            "chat-page__element-button--clicked":
                              clickedButtons[id],
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
                      {id === "channels" && clickedButtons["channels"] && (
                        <ChannelsList onChannelSelect={setActiveChannelId} />
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
              </div>

              <div className="chat-page__messages">
                {messages.map(
                  ({ id, sender, content, time, position }, index) => {
                    const prevMessage = messages[index - 1];
                    const showSenderInfo =
                      !prevMessage ||
                      prevMessage.sender !== sender ||
                      prevMessage.position !== position;

                    return (
                      <div
                        key={`${id}-${index}`}
                        className={classNames("chat-page__message", {
                          "chat-page__message--left": position === "left",
                          "chat-page__message--right": position === "right",
                          "chat-page__message--grouped": !showSenderInfo,
                        })}
                      >
                        <div className="chat-page__message-content">
                          <div className="chat-page__message-label">
                            <div
                              className="chat-page__message-user-info"
                              onClick={() => setIsPopupOpen(true)}
                            >
                              <img
                                src="/public/images/avatar_by_default.svg"
                                alt="avatar"
                                className="chat-page__avatar"
                              />
                              <span className="chat-page__name">
                                {position === "right" ? "Your name" : sender}
                              </span>
                            </div>
                            <div className="chat-page__message-time-info">
                              <span className="chat-page__message-time">
                                {time}
                              </span>
                              <button
                                className="chat-page__message-info"
                                type="button"
                                onClick={() => toggleMenu(id)}
                                aria-expanded={openMenuId === id}
                                aria-haspopup="true"
                              >
                                <img
                                  src="/public/images/three-dots.svg"
                                  alt="info"
                                />
                              </button>
                              {openMenuId === id && (
                                <ul className="chat-page__message-menu">
                                  <li>
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
                              "chat-page__bubble--gray": position === "left",
                            })}
                          >
                            {content}
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              <div className="chat-page__input">
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
            </section>
          )}
        </div>
      </PageLayout>
      {isPopupOpen && <ProfilePopup setIsOpen={setIsPopupOpen} />}
    </>
  );
};
