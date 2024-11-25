import { NavLink } from "react-router-dom";
import "./Sidebar.scss";
import classNames from "classnames";

interface Props {}

export const Sidebar: React.FC<Props> = () => {
  return (
    <aside className="side-bar">
      <div className="side-bar__header">
        <img
          className="side-bar__logo"
          src="../../../public/images/Logo.svg"
          alt="Bioinformatics logo"
        />
      </div>
      <nav className="side-bar__nav">
        <ul className="side-bar__list">
          <li className="side-bar__item">
            <NavLink
              className={({ isActive }: { isActive: boolean }) =>
                classNames("side-bar__link side-bar__link--exercises", {
                  "side-bar__link--active": isActive,
                })
              }
              to="/exercises"
            >
              Exercises
            </NavLink>
          </li>
          <li className="side-bar__item">
            <NavLink
              className={({ isActive }: { isActive: boolean }) =>
                classNames(
                  "side-bar__link side-bar__link side-bar__link--dashboard",
                  {
                    "side-bar__link--active": isActive,
                  }
                )
              }
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="side-bar__item">
            <NavLink
              className={({ isActive }: { isActive: boolean }) =>
                classNames(
                  "side-bar__link side-bar__link side-bar__link--my-exercises",
                  {
                    "side-bar__link--active": isActive,
                  }
                )
              }
              to="/my-exercises"
            >
              My exercises
            </NavLink>
          </li>
          <li className="side-bar__item">
            <NavLink
              className={({ isActive }: { isActive: boolean }) =>
                classNames(
                  "side-bar__link side-bar__link side-bar__link--chats",
                  {
                    "side-bar__link--active": isActive,
                  }
                )
              }
              to="/chats"
            >
              Chats
            </NavLink>
          </li>
          <li className="side-bar__item">
            <NavLink
              className={({ isActive }: { isActive: boolean }) =>
                classNames(
                  "side-bar__link side-bar__link side-bar__link--team",
                  {
                    "side-bar__link--active": isActive,
                  }
                )
              }
              to="/team"
            >
              Team management
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
