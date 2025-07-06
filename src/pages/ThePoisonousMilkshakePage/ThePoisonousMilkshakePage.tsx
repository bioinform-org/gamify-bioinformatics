import { Outlet, } from "react-router-dom";
import { DetailedExercisePage } from "../DetailedExercisePage";


const chapters = [
    { id: 1, name: "Introduction", link: "introduction", completed: false },
    {
      id: 2,
      name: "Species identification",
      link: "species",
      completed: false,
    },
    {
      id: 3,
      name: "Protein identification",
      link: "protein",
      completed: false,
    },
    {
      id: 4,
      name: "Suspect identification",
      link: "suspect",
      completed: false,
    },
  ];

export const ThePoisonousMilkshakePage = () => {
  return (
      <DetailedExercisePage chapters={chapters}>
        <Outlet />
      </DetailedExercisePage>
    );
  }