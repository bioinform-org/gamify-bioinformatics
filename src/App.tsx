import React from "react";
import { Navigate, Route, Routes } from 'react-router-dom'
import { ResetPasswordPage } from "./pages/ResetPasswordPage/ResetPasswordPage";
import { SignInPage } from "./pages/SignInPage/SignInPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import './styles/App.scss';
import { ExercisesPage } from "./pages/ExercisesPage";
import { MyExercisesPage } from "./pages/MyExercisesPage";
import { ResetPasswordEmailSendPage } from "./pages/ResetPasswordEmailSendPage";
import { ResetPasswordSetNewPasswordPage } from "./pages/ResetPasswordSetNewPasswordPage";
import { AuthComponent } from "./components/AuthComponent";

export const App: React.FC = () => {
  return (
    <div 
      className='app'
    >
      <Routes>
        <Route path="/" element={<AuthComponent />}>
          <Route path='/exercises' element={<ExercisesPage/>}/>
          <Route path='/my-exercises' element={<MyExercisesPage/>}/>
        </Route>

        <Route path='/sign-in' element={<SignInPage/>} />
        <Route path='/sign-up' element={<SignUpPage/>}/>

        <Route path='/reset'>
          <Route index element={<ResetPasswordPage/>} />
          <Route path='email-sent' element={<ResetPasswordEmailSendPage/>}/>
          <Route path='set-password/:tokenId' element={<ResetPasswordSetNewPasswordPage/>}/>
        </Route>

        <Route path="*" element={<Navigate to="sign-in"/>} />
      </Routes>
    </div>
  )
};
