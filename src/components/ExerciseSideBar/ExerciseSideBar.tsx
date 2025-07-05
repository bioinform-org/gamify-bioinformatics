import { NavLink } from 'react-router-dom';
import './ExerciseSideBar.scss';
import classNames from 'classnames';
import { InfoBlock } from '../InfoBlock';

type Chapter = {
  id: number;
  name: string;
  link: string;
};

type Props = {
  chapters: Chapter[];
}

export const ExerciseSideBar = ({ chapters }: Props) => {
  return (
    <aside className="exercise-sidebar">
      <div className="exercise-sidebar__container">
        <div className="exercise-sidebar__header">
          <img
            className="exercise-sidebar__logo"
            src="../../../public/images/Logo.svg"
            alt="Bioinformatics logo"
          />
        </div>
        <nav className="exercise-sidebar__nav">
          <InfoBlock />
          <ul className="exercise-sidebar__list">
            {chapters?.map(({ name, link }, index) => (
              <li key={name} className="exercise-sidebar__item">
                <NavLink
                  className={({ isActive }: { isActive: boolean }) =>
                    classNames(
                      `exercise-sidebar__link exercise-sidebar__link--${link}`,
                      {
                        "exercise-sidebar__link--active": isActive,
                      }
                    )
                  }
                  to={`/${link}`}
                >
                  {`${index + 1} ${name}`}
                </NavLink>
              </li>
            ))}
            <li key={'answer'} className="exercise-sidebar__item">
              <NavLink
                className={({ isActive }: { isActive: boolean }) =>
                  classNames(
                    `exercise-sidebar__link exercise-sidebar__link--answer`,
                    {
                      "exercise-sidebar__link--active": isActive,
                    }
                  )
                }
                to={"/answer"}
              >
                Answer page
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}