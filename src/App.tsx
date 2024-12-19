import React from "react";
import { Navigate, Route, Routes } from 'react-router-dom'
import { ResetPasswordPage } from "./pages/ResetPasswordPage/ResetPasswordPage";
import { SignInPage } from "./pages/SignInPage/SignInPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import './styles/App.scss';
import { ExercisesPage } from "./pages/ExercisesPage";
import { MyExercisesPage } from "./pages/MyExercisesPage";
import { DashboardPage } from "./pages/DashboardPage";
import { Team } from "./pages/Team";

export const App: React.FC = () => {
  return (
    <div 
      className='app'
    >
      <Routes>
        <Route path='/' element={<Navigate to={'sign-in'} />}/>
        <Route path='sign-in' element={<SignInPage/>}/>
        <Route path='sign-up' element={<SignUpPage/>}/>
        <Route path='reset' element={<ResetPasswordPage/>}/>
        <Route path='exercises' element={<ExercisesPage/>}/>
        <Route path='dashboard' element={<DashboardPage/>}/>
        <Route path='my-exercises' element={<MyExercisesPage/>}/>
        <Route path='team' element={<Team/>}/>
      </Routes>
    </div>
  )
};
