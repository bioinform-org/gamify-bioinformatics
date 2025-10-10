import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { Exercise } from "../../types/ProductType";
import { ExerciseCard } from "../ExerciseCard";
import "./ExercisesList.scss";
import defaultExercisesImage from '/images/milkshake-image.png';
import { setChaptersForExercise } from "../../store/features/chaptersSlice";
import chaptersData from "../../../public/api/chapters.json";


type Props = {
  listTitle: string;
  exercises: Exercise[];
};

export const ExercisesList: React.FC<Props> = ({ listTitle, exercises }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 🔹 wrzucamy wszystkie ćwiczenia z JSON-a do Redux store
    chaptersData.forEach((exercise) => {
      dispatch(
        setChaptersForExercise({
          exerciseTitle: exercise.exerciseTitle,
          exerciseSlug: exercise.exerciseSlug, // jeśli dodałeś slug w slice
          chapters: exercise.chapters,
        })
      );
    });
  }, [dispatch]);

  return (
    <div className="exercises-list">
      <h4 className="exercises-list__title">{listTitle}</h4>
      <ul className="exercises-list__list">
        {exercises.map((exercise) => (
          <li key={exercise.title} className="exercises-list__item">
            <ExerciseCard
              title={exercise.title}
              description={exercise.description}
              steps={exercise.steps}
              time={exercise.time}
              imagePath={exercise.imagePath || defaultExercisesImage}
              progress={exercise.progress}
              exerciseSlug={exercise.slug}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
