import { useState } from "react";
import "./DetailedExercisePage.scss";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { removeErrorMessageForUser } from "../../store/features/userSlice";
import { removeToken } from "../../store/features/tokenSlice";
import { ExerciseSideBar } from "../../components/ExerciseSideBar";
import { ExerciseNotes } from "../../components/ExerciseNotes";

type Chapter = {
  id: number;
  name: string;
  link: string;
  completed: boolean;
}

type Props = {
  children: React.ReactNode;
  chapters: Chapter[];
};

export const DetailedExercisePage: React.FC<Props> = ({ children, chapters }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const token = useAppSelector(selectToken);
  // const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (!user.value && token.value) {
  //     dispatch(getUser(token.value));
  //   }
  // }, [dispatch, token.value, user.value])

  return (
    <div className="detailed-exercise">
      <ExerciseSideBar chapters={chapters} />

      <div className="detailed-exercise__content">
        <div className="detailed-exercise__header">
          <Link to={"/exercises"} className="detailed-exercise__breadcrumbs">
            Back to Exercises
          </Link>
          <div className="detailed-exercise__user">
            <img
              className="detailed-exercise__user-img"
              src="/images/avatar_by_default.svg"
              alt=""
            />
            <button
              className="detailed-exercise__user-btn"
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              //using setTimeout to give some time for a click on the link to be processed before closing
              onBlur={() => setTimeout(() => setIsMenuOpen(false), 240)}
            >
              Admin
            </button>
          </div>

          {isMenuOpen && (
            <ul className="detailed-exercise__user-menu">
              <li className="detailed-exercise__user-menu-item">
                <Link
                  className="detailed-exercise__user-menu-btn detailed-exercise__user-menu-btn--settings"
                  to="/settings/account"
                >
                  Settings
                </Link>
              </li>
              <li className="detailed-exercise__user-menu-item">
                <Link
                  className="detailed-exercise__user-menu-btn detailed-exercise__user-menu-btn--help"
                  to="/help-center"
                >
                  Help Center
                </Link>
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