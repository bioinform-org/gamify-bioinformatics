import { ExerciseDetails } from "../../components/ExerciseDetails"
import { DetailedExercisePage } from "../DetailedExercisePage"

const chapters = [
  { id: 1, name: "Introduction", link: "introduction" },
  { id: 2, name: "Species identification", link: "species" },
  { id: 3, name: "Protein identification", link: "protein" },
  { id: 4, name: "Suspect identification", link: "suspect" },
];

export const ThePoisonousMilkshakePage = () => {
  return (
    <DetailedExercisePage chapters={chapters}>
      <ExerciseDetails />
    </DetailedExercisePage>
  );
}