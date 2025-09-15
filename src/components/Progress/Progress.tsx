import "./Progress.scss";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getExercises } from "../../store/features/exercisesSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

type Props = {
  className?: string;
};

export const Progress: React.FC<Props> = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const exercises = useSelector((state: RootState) => state.exercises.value);

  useEffect(() => {
    dispatch(getExercises());
  }, [dispatch]);

  return (
    <div className={`progress ${className}`.trim()}>
      <h4 className="progress__title">Your progress</h4>
      <table className="progress__table">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Exercises Completed</th>
          </tr>
        </thead>
        <tbody>
          {exercises?.map((exercise, index) => {
            const completed =
              exercise.progress !== null
                ? Math.round((exercise.progress / 100) * exercise.steps)
                : 0;

            return (<tr key={index}>
              <td>
                <img
                  src={exercise.imagePath}
                  alt={`${exercise.title} icon`}
                  className="icon"
                />
                {exercise.title}
              </td>
              <td>
                {completed}/{exercise.steps}
              </td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
};
