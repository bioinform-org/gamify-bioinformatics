import React from "react";
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { ResetPasswordPage } from "./pages/ResetPasswordPage/ResetPasswordPage";
import { SignInPage } from "./pages/SignInPage/SignInPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import './styles/App.scss';

export const App: React.FC = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route path='sign-in' element={<SignInPage/>}/>
            <Route path='sign-up' element={<SignUpPage/>}/>
            <Route path='reset' element={<ResetPasswordPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
};
