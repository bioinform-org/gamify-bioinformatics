import { User } from "../../types/ProductType";
import "./ProfilePopup.scss";

type Props = {
  setIsOpen: (a: boolean) => void;
  user: User;
  onDirectMessage: (user: User) => void;
};

export const ProfilePopup: React.FC<Props> = ({ setIsOpen, user, onDirectMessage }) => {
  return (
    <>
      <div className="overlay" onClick={() => setIsOpen(false)} />
      <div className="profile">
        <div className="profile__info">
          <div className="profile__close">
            <button
              className="profile__close--button"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="profile__main">
            <img
              src="/images/avatar_by_default.svg"
              alt="avatar"
              className="profile__main--avatar"
            />
            <div className="profile__main--info">
              <span className="profile__main--info-name">{user.name}</span>
              <div className="profile__main--info-mail">
                <img
                  src="/images/mail-icon.svg"
                  alt="mail"
                  className="profile__main--info-mail-icon"
                />
                <span className="profile__main--info-mail-address">
                  {user.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile__secondary-info">
          <button
            className="profile__secondary-info--button"
            onClick={() => onDirectMessage(user)}
          >
            Direct message
          </button>
          <div className="profile__secondary-info profile__secondary-info--rewards">
            <span className="profile__secondary-info--rewards-subject">
              Rewards
            </span>
            <div className="profile__secondary-info--rewards-icons">
              <img
                src="/images/molecular-biology-circle.svg"
                className="profile__secondary-info--rewards-icon"
              />
              <img
                src="/images/molecular-biology-circle.svg"
                className="profile__secondary-info--rewards-icon"
              />
              <img
                src="/images/molecular-biology-circle.svg"
                className="profile__secondary-info--rewards-icon"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
