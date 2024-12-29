import React, { useEffect } from "react";
import { Navigate, Route, Routes } from 'react-router-dom'
import { ResetPasswordPage } from "./pages/ResetPasswordPage/ResetPasswordPage";
import { SignInPage } from "./pages/SignInPage/SignInPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import './styles/App.scss';
import { ExercisesPage } from "./pages/ExercisesPage";
import { MyExercisesPage } from "./pages/MyExercisesPage";
import { ResetPasswordEmailSendPage } from "./pages/ResetPasswordEmailSendPage";
import { ResetPasswordSetNewPasswordPage } from "./pages/ResetPasswordSetNewPasswordPage";
import { SettingsPage } from "./pages/SettingsPage";
import { SettingsAccountComponent } from "./components/SettingsAccountComponent";
import { SettingsConnectedAccountsComponent } from "./components/SettingsConnectedAccountsComponent";
import { SettingsPasswordComponent } from "./components/SettingsPasswordComponent";
import { AuthComponent } from "./components/AuthComponent";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { getTokenFromStorage, selectToken } from "./store/features/tokenSlice";
import { Loader } from "./components/Loader";

export const App: React.FC = () => {
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  //checking if token is in the localStorage, if yes, then we will get it from localStorage and add to redux store
  //while we are waiting for it, we will show loading
  useEffect(() => {
    if (!token.value) {
      dispatch(getTokenFromStorage());
    }
  }, [token.value])

  return (
    <div 
      className='app'
    >
      {token.isLoading ? 
        (
          <div className="app__loader-container">
            <Loader />
          </div>
        ) : (
        <Routes>
          <Route path="/" element={<AuthComponent />}>
            <Route path='exercises' element={<ExercisesPage/>}/>
            <Route path='my-exercises' element={<MyExercisesPage/>}/>
            <Route path='settings' element={<SettingsPage/>}>
              <Route index element={<Navigate to={'account'}/>}/>
              <Route path='account' element={<SettingsAccountComponent />}/>
              <Route path='password' element={<SettingsPasswordComponent />}/>
              <Route path='connected-accounts' element={<SettingsConnectedAccountsComponent />}/>
            </Route>
          </Route>

          <Route path='sign-in' element={<SignInPage/>} />
          <Route path='sign-up' element={<SignUpPage/>}/>

          <Route path='reset'>
            <Route index element={<ResetPasswordPage/>} />
            <Route path='email-sent' element={<ResetPasswordEmailSendPage/>}/>
            <Route path='set-password' element={<ResetPasswordSetNewPasswordPage/>}/>
          </Route>
        </Routes>
      )}
    </div>
  )
};
