import "./ExercisesPage.scss";
import { ExercisesList } from "../../components/ExercisesList";
import { PageLayout } from "../PageLayout";
import { useEffect, useState } from "react";
import { Exercise } from "../../types/ProductType";
import { getExercises } from "../../store/features/exercisesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectExercises, setErrorMessageForMessages } from "../../store/features/exercisesSlice";

type Props = {};

export const ExercisesPage: React.FC<Props> = () => {
  const [molBioExercises, setMolBioExercises] = useState<Exercise[]>([]);
  const [pythonExercises, setPythonExercises] = useState<Exercise[]>([]);
  const exercises = useAppSelector(selectExercises);
  const dispatch = useAppDispatch()

  //CHECK OUT MyExercisesPage.tsx WHERE IS THE SAME CODE AS HERE

  useEffect(() => {
    dispatch(getExercises());
  }, []);

  useEffect(() => {
    if (exercises.value) {
      setMolBioExercises(exercises.value.filter(
        (exercise) => exercise.topic === "Molecular biology"
      ));
      setPythonExercises(exercises.value.filter(
        (exercise) => exercise.topic === "Basics of Python"
      ));
    }
  }, [exercises.value])

  useEffect(() => {
    if (!molBioExercises.length && !pythonExercises.length) {
      dispatch(setErrorMessageForMessages(
        "No exercises available at the moment. Please check back later."
      ))
    } else {
      dispatch(setErrorMessageForMessages(""))
    }
  }, [molBioExercises, pythonExercises]);

  return (
    <PageLayout
      pageTitle="Exercises"
      isLoading={exercises.isLoading}
      errorMessage={exercises.errorMessage}
    >
      {!exercises.isLoading && molBioExercises.length > 0 && (
        <ExercisesList
          listTitle="Molecular biology"
          exercises={molBioExercises}
        />
      )}
      {!exercises.errorMessage && pythonExercises.length > 0 && (
        <ExercisesList
          listTitle="Basics of Python"
          exercises={pythonExercises}
        />
      )}
    </PageLayout>
  );
};
