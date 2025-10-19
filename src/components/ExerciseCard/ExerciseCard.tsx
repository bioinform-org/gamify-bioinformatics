import classNames from "classnames";
import "./ExerciseCard.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

type Props = {
  title: string;
  description: string;
  steps: number;
  time: string;
  imagePath: string;
  progress: number | null;
  exerciseSlug: string; 
};

export const ExerciseCard: React.FC<Props> = ({
  title,
  description,
  steps,
  time,
  imagePath,
  progress,
  exerciseSlug,
}) => {
  const chapters = useAppSelector((state) =>
    state.chapters.items.filter((ch) => ch.exerciseSlug === exerciseSlug)
  );

  const firstIncomplete = chapters.find((ch) => !ch.completed);
  const firstChapter = chapters[0];
  const targetChapter = firstIncomplete || firstChapter;

  const linkTarget = targetChapter
    ? `/${exerciseSlug}/${targetChapter.link}`
    : "#";

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
        to={linkTarget}
      >
        {progress === 100 ? "Completed!" : !progress ? "Start" : "Continue"}
      </Link>
    </article>
  );
};
