import { useEffect, useState } from "react";
import { ExercisesList } from "../../components/ExercisesList";
import { PageLayout } from "../PageLayout";
import "./MyExercisesPage.scss";
import { getExercises } from "../../api";
import { Exercise } from "../../types/ProductType";

type Props = {};

export const MyExercisesPage: React.FC<Props> = () => {
  const [onGoingExercises, setOnGoingExercises] = useState<Exercise[]>([]);
  const [completedExercises, setCompletedExercises] = useState<Exercise[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getExercises()
      .then((readyExercises) =>
        readyExercises.filter(
          (exercise) => exercise.progress && exercise.progress !== 100
        )
      )
      .then(setOnGoingExercises)
      .catch(() => {
        setErrorMessage(
          "No exercises available at the moment. Please check back later."
        );
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getExercises()
      .then((readyExercises) =>
        readyExercises.filter((exercise) => exercise.progress === 100)
      )
      .then(setCompletedExercises)
      .catch(() => {
        setErrorMessage(
          "No exercises available at the moment. Please check back later."
        );
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!onGoingExercises.length && !completedExercises.length) {
      setErrorMessage(
        "No exercises available at the moment. Please check back later."
      );
    } else {
      setErrorMessage("");
    }
  }, [onGoingExercises, completedExercises]);

  return (
    <PageLayout
      pageTitle="My exercises"
      isLoading={isLoading}
      errorMessage={errorMessage}
    >
      {onGoingExercises.length > 0 && (
        <ExercisesList listTitle="Ongoing" exercises={onGoingExercises} />
      )}
      {completedExercises.length > 0 && (
        <ExercisesList listTitle="Completed" exercises={completedExercises} />
      )}
    </PageLayout>
  );
};
