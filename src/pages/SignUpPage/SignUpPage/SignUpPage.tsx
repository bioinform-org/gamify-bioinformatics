import classNames from 'classnames';
import { PageCompilator } from '../../PageCompilator/PageCompilator';
import './SignUpPage.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import eyeImg from '../../../../public/images/eye.svg';
import eyeSlashImg from '../../../../public/images/eye-slash.svg';
import { PasswordRules } from '../../../components/PasswordRules';
import { Loader } from '../../../components/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { getTokenFromRegestration, selectToken, removeErorrMessageForToken } from '../../../store/features/tokenSlice';
import { getUser, selectUser, removeErrorMessageForUser } from '../../../store/features/userSlice';
import { Role } from '../../../types/Roles';
import { validateEmail, validatePassword, validateUserName } from '../../../utils/validation';
import { AuthViaGoogleFacebookApple } from '../../../components/AuthViaGoogleFacebookApple';

export const SignUpPage = () => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState('');
  const [isUserNameError, setIsUserNameError] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordError, setIsPasswordError] = useState('');
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const userNameValidation = validateUserName(username);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password)

    dispatch(removeErorrMessageForToken());
    dispatch(removeErrorMessageForUser());
  

    if (!userNameValidation) {
      setIsUserNameError(() => 'Username should be at least 4 characters long');
    }

    if (!emailValidation) {
      setIsEmailError(() => 'Please enter a valid email');
    }

    if (!passwordValidation) {
      setIsPasswordError(() => 'The password does not meet the requirements');
    }

    if (!userNameValidation || !emailValidation || !passwordValidation) {
      return;
    }

    dispatch(getTokenFromRegestration({ email, password, username, roles: Role.user }))
  }

  useEffect(() => {
    if (userNameRef.current) {
      userNameRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (token.value) {
      dispatch(getUser(token.value));
    }
  }, [token.value])

  useEffect(() => {
    if (token.value && user.value) {
      navigate('/exercises');
    }
  }, [token.value, user.value])

  return (
      <PageCompilator 
        titlesText={{
          titleTop: 'Join our community of young scientists!',
          titleBottom: 'Create an account to start learning with us',
        }}
        imageLink={'../../../public/images/sign-up-girl.png'}
      >
        <form 
          className="page-compilator__form" 
          onSubmit={handleSubmit}
        > 
          <label className="page-compilator__label">
            Username
            <input
              type="text"
              className={classNames("page-compilator__input", {
                "page-compilator__input--error": isUserNameError,
              })}
              ref={userNameRef}
              placeholder="Create your username"
              autoComplete="off"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setIsUserNameError('');
              }}
            />
            
            {isUserNameError && <p className="page-compilator__error-message">{isUserNameError}</p>}
          </label>

          <label className="page-compilator__label">
            Email
            <input
              className={classNames("page-compilator__input", {
                "page-compilator__input--error": isEmailError,
              })}
              type="text"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsEmailError('');
              }}
            />

            {isEmailError && <p className="page-compilator__error-message">{isEmailError}</p>}
          </label>

          <div>
            <label className="page-compilator__label">
              Password
              <input
                className={classNames("page-compilator__input", {
                  "page-compilator__input--error": isPasswordError,
                })}
                type={isVisiblePassword ? 'text' : 'password'}
                placeholder="Create password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setIsPasswordError('');
                }}
              >
              </input>

              <img 
                src={isVisiblePassword ? eyeSlashImg : eyeImg} 
                alt="Show password button" 
                className='page-compilator__input-eye'
                onClick={() => setIsVisiblePassword(!isVisiblePassword)}
              />

              {isPasswordError && <p className="page-compilator__error-message">{isPasswordError}</p>}
            </label>

            <div className="page-compilator__password-rules-container">
              <PasswordRules 
                password={password}
              />
            </div>
          </div>

          {(token.errorMessage || user.errorMessage) && (
            <div className="page-compilator__server-error">
              {token.errorMessage || user.errorMessage}
            </div>
          )}

          <button className="page-compilator__submit">
            {token.isLoading || user.isLoading ? <Loader shouldBeText={false}/> : 'Sign Up'}
          </button>
        </form>

        <AuthViaGoogleFacebookApple />

        <div className="page-compilator__sign-up">
          <p className="page-compilator__sign-up-text">
            Already have an account?
          </p>

          {/* // ask designers if there is a need for this button disable stylization */}
          <button className="page-compilator__sign-up-button">
            <Link 
              to={'/sign-in'} 
              className="page-compilator__sign-up-link"
            >
              Log In
            </Link>
          </button>
        </div>

        <p className="page-compilator__terms">
          By continuing, you agree to our&nbsp;
          <button className='page-compilator__terms-button'>
            <Link 
              to="/"
              className='page-compilator__terms-link'
            >
              Privacy Policy
            </Link>
          </button> 

          <br />

          and&nbsp;
          <button className='page-compilator__terms-button'>
            <Link 
              to="/"
              className='page-compilator__terms-link'
            >
              Terms of Service
            </Link>.
          </button> 
        </p>
      </PageCompilator>
  );
};
