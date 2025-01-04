import "./SignInPage.scss";
import { PageCompilator } from "../../PageCompilator/PageCompilator";
import { FormEvent, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getTokenFromLogin, selectToken, setErorrMessageForToken } from "../../../store/features/tokenSlice";
import { getUser, selectUser, setErrorMessageForUser } from "../../../store/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import eyeImg from '../../../../public/images/eye.svg';
import eyeSlashImg from '../../../../public/images/eye-slash.svg';
import { Loader } from "../../../components/Loader";
import { useGoogleLogin } from "@react-oauth/google";

export const SignInPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('')
  const [isEmailError, setIsEmailError] = useState(false);
  const [password, setPassword] = useState('')
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  //implement navigation to a previously opened page
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: codeResponse => console.log(codeResponse),
    onError: () => console.log('Login Failed'),
    // flow: 'auth-code',
  })

  // const googleLogin = useGoogleLogin({
  //   onSuccess: async tokenResponse => {
  //     console.log(tokenResponse);
  //     // fetching userinfo can be done on the client or the server
  //     const userInfo = await axios
  //       .get('https://www.googleapis.com/oauth2/v3/userinfo', {
  //         headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
  //       })
  //       .then(res => res.data);

  //     console.log(userInfo);
  //   },
  // })


  // const googleLoginBackend = useGoogleLogin({
  //   onSuccess: async ({ code }) => {
  //     const tokens = await axios.post('http://localhost:3001/auth/google', {  // http://localhost:3001/auth/google backend that will exchange the code
  //       code,
  //     });
  
  //     console.log(tokens);
  //   },
  //   flow: 'auth-code',
  // });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(setErorrMessageForToken());
    dispatch(setErrorMessageForUser());
    dispatch(getTokenFromLogin({ email, password }))
  }

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, [])

  useEffect(() => {
    if (token.errorMessage || user.errorMessage) {
      setIsEmailError(true);
      setIsPasswordError(true);
    }
  }, [token.errorMessage, user.errorMessage]);

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
        titleTop: 'Welcome back!',
        titleBottom: 'Log in to continue your learning journey',
      }}
      imageLink={'../../../public/images/man-science.png'}
    >
      <form 
        className="page-compilator__form" 
        onSubmit={handleSubmit}
      >
        <label className="page-compilator__label">
          Email
          <input
            className={classNames("page-compilator__input", {
              "page-compilator__input--error": isEmailError,
            })}
            type="text"
            ref={emailRef}
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailError(false);
            }}
          />
        </label>

        <div>
          <label className="page-compilator__label">
            Password
            <input
              className={classNames("page-compilator__input", {
                "page-compilator__input--error": isPasswordError,
              })}
              type={isVisiblePassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setIsPasswordError(false);
              }}
            >
            </input>

            <img 
              src={isVisiblePassword ? eyeSlashImg : eyeImg} 
              alt="Show password button" 
              className='page-compilator__input-eye'
              onClick={() => setIsVisiblePassword(!isVisiblePassword)}
            />
          </label>
        </div>

        <button className='page-compilator__forgot-password'>
          <Link to="/reset" className="page-compilator__forgot-password-link">
            I forgot my password
          </Link>
        </button>

        {(token.errorMessage || user.errorMessage) && (
            <div className="page-compilator__server-error">
              {token.errorMessage || user.errorMessage}
            </div>
          )}

        <button className="page-compilator__submit">
          {token.isLoading || user.isLoading ? <Loader shouldBeText={false}/> : "Log In"}
        </button>
      </form>

      <span className="page-compilator__divider">or</span>

      <ul className="page-compilator__social-buttons">
        <li 
          className="page-compilator__button-container"
        >
          <button 
            className="page-compilator__button page-compilator__button--top"
            onClick={() => googleLogin()}
          >
            <div 
              className="page-compilator__button-img page-compilator__button-img--google"
            ></div>

            <div className="page-compilator__button-text">
              Continue with Google
            </div>
          </button>
        </li>

        {['Facebook', 'Apple'].map((button) => {
          return (
            <li 
              className="page-compilator__button-container"
              key={button}
            >
              <button 
                className="page-compilator__button"
              >
                <div 
                  className={`page-compilator__button-img page-compilator__button-img--${button.toLowerCase()}`}
                ></div>

                <div className="page-compilator__button-text">
                  Continue with {button}
                </div>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="page-compilator__sign-up">
        <p className="page-compilator__sign-up-text">
          Not a member yet?
        </p>

        <button className="page-compilator__sign-up-button">
          <Link 
            to={'/sign-up'} 
            className="page-compilator__sign-up-link"
          >
            Sign Up'
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

