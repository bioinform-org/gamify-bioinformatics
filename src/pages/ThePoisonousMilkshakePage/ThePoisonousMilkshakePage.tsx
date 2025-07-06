import { Outlet, } from "react-router-dom";
import { DetailedExercisePage } from "../DetailedExercisePage";


const chapters = [
    { 
      id: 1, 
      name: "Introduction", 
      link: "introduction", 
      completed: false },
    {
      id: 2,
      name: "Species identification",
      link: "species-identification",
      completed: false,
    },
    {
      id: 3,
      name: "Protein identification",
      link: "protein-identification",
      completed: false,
    },
    {
      id: 4,
      name: "Suspect identification",
      link: "suspect-identification",
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