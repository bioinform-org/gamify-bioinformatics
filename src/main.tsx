import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import { App } from './App.tsx'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { SignInPage } from './pages/SignInPage/SignInPage/SignInPage.tsx'
import { SignUpPage } from './pages/SignUpPage/SignUpPage/SignUpPage.tsx'
import { ResetPasswordPage } from './pages/ResetPasswordPage/ResetPasswordPage/ResetPasswordPage.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<SignInPage/>}/>
        <Route path='/' element={<App/>}/>
        <Route path='sign-up' element={<SignUpPage/>}/>
        <Route path='reset' element={<ResetPasswordPage/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
