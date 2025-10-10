import { useState } from "react";
import "./DetailedExercisePage.scss";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeErrorMessageForUser } from "../../store/features/userSlice";
import { removeToken } from "../../store/features/tokenSlice";
import { ExerciseSideBar } from "../../components/ExerciseSideBar";
import { ExerciseNotes } from "../../components/ExerciseNotes";

type Props = {
  children: React.ReactNode;
  exerciseTitle: string;
  exerciseSlug: string;
};

export const DetailedExercisePage: React.FC<Props> = ({
  children,
  exerciseSlug,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();

  const chapters = useAppSelector((state) =>
    state.chapters.items.filter((ch) => ch.exerciseSlug === exerciseSlug)
  );

  return (
    <div className="detailed-exercise">
      <ExerciseSideBar chapters={chapters} />

      <div className="detailed-exercise__content">
        <div className="detailed-exercise__header">
          <Link to={"/exercises"} className="detailed-exercise__breadcrumbs">
            Back to Exercises
          </Link>

          <div className="detailed-exercise__user">
            <img className="detailed-exercise__user-img" src="/images/avatar_by_default.svg" alt="" />
            <button
              className="detailed-exercise__user-btn"
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onBlur={() => setTimeout(() => setIsMenuOpen(false), 240)}
            >
              Admin
            </button>
          </div>

          {isMenuOpen && (
            <ul className="detailed-exercise__user-menu">
              <li className="detailed-exercise__user-menu-item">
                <Link className="detailed-exercise__user-menu-btn detailed-exercise__user-menu-btn--settings" to="/settings/account">Settings</Link>
              </li>
              <li className="detailed-exercise__user-menu-item">
                <Link className="detailed-exercise__user-menu-btn detailed-exercise__user-menu-btn--help" to="/help-center">Help Center</Link>
              </li>
              <li className="detailed-exercise__user-menu-item">
                <Link
                  className="detailed-exercise__user-menu-btn detailed-exercise__user-menu-btn--logout"
                  to=""
                  onClick={() => {
                    dispatch(removeToken());
                    dispatch(removeErrorMessageForUser());
                  }}
                >
                  Log Out
                </Link>
              </li>
            </ul>
          )}
        </div>

        {children}
      </div>
      <ExerciseNotes />
    </div>
  );
};
