import "./ExercisesPage.scss";
import { ExercisesList } from "../../components/ExercisesList";
import { PageLayout } from "../PageLayout";
import { useEffect, useState } from "react";
import { Exercise } from "../../types/ProductType";
import { getExercises } from "../../api";

type Props = {};

export const ExercisesPage: React.FC<Props> = () => {
  const [molBioExercises, setMolBioExercises] = useState<Exercise[]>([]);
  const [pythonExercises, setPythonExercises] = useState<Exercise[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getExercises()
      .then((readyExercises) =>
        readyExercises.filter(
          (exercise) => exercise.topic === "Molecular biology"
        )
      )
      .then(setMolBioExercises)
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
        readyExercises.filter(
          (exercise) => exercise.topic === "Basics of Python"
        )
      )
      .then(setPythonExercises)
      .catch(() => {
        setErrorMessage(
          "No exercises available at the moment. Please check back later."
        );
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!molBioExercises.length && !pythonExercises.length) {
      setErrorMessage(
        "No exercises available at the moment. Please check back later."
      );
    } else {
      setErrorMessage("");
    }
  }, [molBioExercises, pythonExercises]);

  return (
    <PageLayout
      pageTitle="Exercises"
      isLoading={isLoading}
      errorMessage={errorMessage}
    >
      {!isLoading && molBioExercises.length > 0 && (
        <ExercisesList
          listTitle="Molecular biology"
          exercises={molBioExercises}
        />
      )}
      {!isLoading && pythonExercises.length > 0 && (
        <ExercisesList
          listTitle="Basics of Python"
          exercises={pythonExercises}
        />
      )}
    </PageLayout>
  );
};
