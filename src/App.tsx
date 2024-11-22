import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from 'react-router-dom'
import { ResetPasswordPage } from "./pages/ResetPasswordPage/ResetPasswordPage";
import { SignInPage } from "./pages/SignInPage/SignInPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import './styles/App.scss';
import classNames from "classnames";

export const App: React.FC = () => {
  return (
    <div 
      className={classNames('app', {'app--height': false})}
    >
      <Routes>
        <Route path='/'>
          <Route path='sign-in' element={<SignInPage/>}/>
          <Route path='sign-up' element={<SignUpPage/>}/>
          <Route path='reset' element={<ResetPasswordPage/>}/>
        </Route>
      </Routes>
    </div>
  )
};
