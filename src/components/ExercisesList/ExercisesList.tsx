import { Exercise } from "../../types/ProductType";
import { ExerciseCard } from "../ExerciseCard";
import "./ExercisesList.scss";
import defaultExercisesImage from '/images/milkshake-image.png';

type Props = {
  listTitle: string;
  exercises: Exercise[];
};

export const ExercisesList: React.FC<Props> = ({ listTitle, exercises }) => {
  return (
    <div className="exercises-list">
      <h4 className="exercises-list__title">{listTitle}</h4>

      <ul className="exercises-list__list">
        {exercises.map((exercise) => (
          <li
            key={exercise.title}
            className="exercises-list__item"
          >
            <ExerciseCard
              title={exercise.title}
              description={exercise.description}
              steps={exercise.steps}
              time={exercise.time}
              //think about a way to store images on the server or possibly using a third party
              imagePath={exercise.imagePath || defaultExercisesImage}
              progress={exercise.progress}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
