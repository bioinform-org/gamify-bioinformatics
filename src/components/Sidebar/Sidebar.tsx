import { NavLink } from "react-router-dom";
import "./Sidebar.scss";
import classNames from "classnames";
import { useAppSelector } from "../../store/hooks";  // import hooka Redux
import { selectUnreadMessagesCount } from "../../store/features/messageSlice";

interface Props {}

const navLinks = [
  { name: "Exercises", link: "exercises" },
  { name: "Dashboard", link: "dashboard" },
  { name: "My exercises", link: "my-exercises" },
  { name: "Chats", link: "chats" },
  { name: "Team management", link: "team" },
  { name: "Control panel", link: "control-panel" },
];

export const Sidebar: React.FC<Props> = () => {
  // Pobieramy totalną liczbę nieprzeczytanych wiadomości z Reduxa
  const totalMessages = useAppSelector(selectUnreadMessagesCount);

  return (
    <aside className="side-bar">
      <div className="side-bar__container">
        <div className="side-bar__header">
          <img
            className="side-bar__logo"
            src="/images/Logo.svg"
            alt="Bioinformatics logo"
          />
        </div>
        <nav className="side-bar__nav">
          <ul className="side-bar__list">
            {navLinks.map(({ name, link }) => (
              <li key={name} className="side-bar__item">
                <NavLink
                  className={({ isActive }: { isActive: boolean }) =>
                    classNames(`side-bar__link side-bar__link--${link}`, {
                      "side-bar__link--active": isActive,
                    })
                  }
                  to={`/${link}`}
                >
                  {name}
                  {name === "Chats" && totalMessages > 0 && (
                    <span className="side-bar__link-info">{totalMessages}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
