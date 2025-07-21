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
import { getTokenFromStorage, selectToken, setToken } from "./store/features/tokenSlice";
import { Loader } from "./components/Loader";
import { DashboardPage } from "./pages/DashboardPage";
import { Team } from "./pages/Team";
import { selectUser } from "./store/features/userSlice";
import { ChatPage } from "./pages/ChatPage";
import { ChatInfoProvider } from "./store/ChatInfoProvider";
import { Introduction } from "./pages/ThePoisonousMilkshakePage/components/Introduction/Introduction";
import { ThePoisonousMilkshakePage } from "./pages/ThePoisonousMilkshakePage";
import { SpeciesIdentification } from "./pages/ThePoisonousMilkshakePage/components/SpeciesIdentification";
import { ProteinIdentification } from "./pages/ThePoisonousMilkshakePage/components/ProteinIdentification";
import { SuspectIdentification } from "./pages/ThePoisonousMilkshakePage/components/SuspectIdentification";
import { Answer } from "./pages/ThePoisonousMilkshakePage/components/Answer";
import { ControlPanel } from "./pages/ControlPanel";
import { Reports } from "./components/Reports";
import { BlockedUsers } from "./components/BlockedUsers";

export const App: React.FC = () => {
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();


  //checking if token is in the localStorage, if yes, then we will get it from localStorage and add to redux store
  //while we are waiting for it, we will show loading
  useEffect(() => {
    if (!token.value) {
      dispatch(getTokenFromStorage());
    }
  }, []);

  useEffect(() => {
    if (user.value && 'token' in user.value && user.value.token) {
      dispatch(setToken(user.value.token));
    }
  }, [user.value])

  return (
    <div className="app">
      {token.isAppLoading ? (
        <div className="app__loader-container">
          <Loader />
        </div>
      ) : (
        <ChatInfoProvider>
        <Routes>
          <Route path="/" element={<AuthComponent />}>
            <Route index element={<Navigate to={"exercises"} />} />
            <Route path="/exercises" element={<ExercisesPage />} />
            <Route
              path="/the-poisonous-milkshake"
              element={<ThePoisonousMilkshakePage />}
            >
              <Route index element={<Introduction />} />
              <Route path="introduction" element={<Introduction />} />
              <Route
                path="species-identification"
                element={<SpeciesIdentification />}
              />
              <Route
                path="protein-identification"
                element={<ProteinIdentification />}
              />
              <Route
                path="suspect-identification"
                element={<SuspectIdentification />}
              />
              <Route path="answer" element={<Answer />} />
            </Route>
            <Route path="/my-exercises" element={<MyExercisesPage />} />
            <Route path="/chats" element={<ChatPage/>}/>
            <Route path="/settings" element={<SettingsPage />}>
              <Route index element={<Navigate to={"account"} />} />
              <Route path="account" element={<SettingsAccountComponent />} />
              <Route path="password" element={<SettingsPasswordComponent />} />
              <Route
                path="connected-accounts"
                element={<SettingsConnectedAccountsComponent />}
              />
            </Route>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/team" element={<Team />} />
            <Route path="/control-panel" element={<ControlPanel />}>
              <Route path="reports" element={<Reports />} />
              <Route path="blocked-users" element={<BlockedUsers />} />
            </Route>
          </Route>

          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />

          <Route path="reset">
            <Route index element={<ResetPasswordPage />} />
            <Route path="email-sent" element={<ResetPasswordEmailSendPage />} />
            <Route path="set-password">
              <Route
                path=":tokenId"
                element={<ResetPasswordSetNewPasswordPage />}
              />
            </Route>
          </Route>
        </Routes>
        </ChatInfoProvider>
      )}
    </div>
  );
};
