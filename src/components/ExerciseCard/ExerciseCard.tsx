import classNames from "classnames";
import "./ExerciseCard.scss";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  description: string;
  steps: number;
  time: string;
  imagePath: string;
  progress: number | null;
};

export const ExerciseCard: React.FC<Props> = ({
  title,
  description,
  steps,
  time,
  imagePath,
  progress,
}) => {
  return (
    <article className="exercise-card">
      <img src={imagePath} alt="" className="exercise-card__img" />
      <h4 className="exercise-card__title">{title}</h4>
      <p className="exercise-card__text">{description}</p>

      {!progress ? (
        <div className="exercise-card__progress">
          <p className="exercise-card__progress-steps">
            Includes&nbsp;
            <span>{steps} steps</span>
          </p>
          <span className="exercise-card__progress-hours">
            <span>{time}</span>
            &nbsp;hours
          </span>
        </div>
      ) : (
        <div className="exercise-card__progress-bar">
          <div className="exercise-card__progress-bar-line">
            <div
              className="exercise-card__progress-bar-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="exercise-card__progress-bar-label">{progress}%</span>
        </div>
      )}

      <Link
        className={classNames("exercise-card__btn", {
          "exercise-card__btn--completed": progress === 100,
        })}
        to="/the-poisonous-milkshake/introduction"
      >
        {progress === 100 ? "Completed!" : !progress ? "Start" : "Continue"}
      </Link>
    </article>
  );
};
