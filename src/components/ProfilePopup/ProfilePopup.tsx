import "./ProfilePopup.scss";

type Props = {
    setIsOpen: (a:boolean) => void;
}

export const ProfilePopup: React.FC<Props> = ({ setIsOpen }) => {

  return (
    <>
          <div className="overlay" onClick={()=>setIsOpen(false)} />
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
                  <span className="profile__main--info-name">Tom Jones</span>
                  <div className="profile__main--info-mail">
                    <img
                      src="/images/mail-icon.svg"
                      alt="mail"
                      className="profile__main--info-mail-icon"
                    />
                    <span className="profile__main--info-mail-address">
                      emailaddress@mail.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile__secondary-info">
              <button className="profile__secondary-info--button">
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
