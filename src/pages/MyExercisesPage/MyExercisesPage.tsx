import { useEffect, useState } from "react";
import { ExercisesList } from "../../components/ExercisesList";
import { PageLayout } from "../PageLayout";
import "./MyExercisesPage.scss";;
import { Exercise } from "../../types/ProductType";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  testSelectExercises,
  setErrorMessageForExercises,
  testGetExercises,
} from "../../store/features/testExercisesSlice";
import { ExerciseDetails } from "../../components/ExerciseDetails";

type Props = {};

export const MyExercisesPage: React.FC<Props> = () => {
  const [onGoingExercises, setOnGoingExercises] = useState<Exercise[]>([]);
  const [completedExercises, setCompletedExercises] = useState<Exercise[]>([]);
  const exercises = useAppSelector(testSelectExercises);
  const dispatch = useAppDispatch()

  //updated logic:
  //instead of making additional states (loading and messages), they were moved to appropriate slicers, which simplified our code and 
  //made it more readible: basically when page is rendered, we are calling for dispatch(getExercises) to get them
  //in the exercisesSlice: loading and errorMessage ARE ALREADY HANDLED by slices, so we only import them from there ;)))))
  useEffect(() => {
    dispatch(testGetExercises());
  }, []);

  //here we are checking if exercises.value changed from null to Exercises[] and if yes, we set appropriate exercises
  useEffect(() => {
    if (exercises.value) {
      setOnGoingExercises(exercises.value.filter(
        (exercise) => exercise.progress && exercise.progress !== 100)
      );

      setCompletedExercises(exercises.value.filter((exercise) => exercise.progress === 100))
    }
  }, [exercises.value])

  //here is an updated additional check for possible empty states
  useEffect(() => {
    if (!onGoingExercises.length && !completedExercises.length) {
      dispatch(setErrorMessageForExercises("No exercises available at the moment. Please check back later."))
    } else {
      dispatch(setErrorMessageForExercises(""));
    }
  }, [onGoingExercises, completedExercises]);

  return (
    <PageLayout
      pageTitle="My exercises"
      isLoading={exercises.isLoading}
      errorMessage={exercises.errorMessage}
    >
      <ExerciseDetails />
      {/* {onGoingExercises.length > 0 && (
        <ExercisesList listTitle="Ongoing" exercises={onGoingExercises} />
      )}
      {completedExercises.length > 0 && (
        <ExercisesList listTitle="Completed" exercises={completedExercises} />
      )} */}
    </PageLayout>
  );
};
