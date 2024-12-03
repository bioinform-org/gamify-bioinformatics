import { Link, useLocation, useNavigate } from 'react-router-dom';
import './PageCompilator.scss';
import { FormEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { createUser, getUser, selectUser } from '../../../store/features/userSlice';

type PageCopilatorProps = {
  titlesText: {
    titleTop: string,
    titleBottom: string,
    secondTitleBottom?: string,
  },
  imageLink: string,
  submitMessage?: string,
  shouldBeForm?: boolean,
  shouldBeEmail?: boolean,
  shouldBePassword?: boolean,
}

export const PageCompilator: React.FC<PageCopilatorProps> = ({
  titlesText,
  imageLink,
  submitMessage,
  shouldBeForm = true,
  shouldBeEmail = true,
  shouldBePassword = true,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  //will need to be implemented
  //add email and password verification function
  //add new styles on incorrect fields
  //add incorrect email and password message during login (show message 'Email or password is incorrect. Please try again')
  //add incorrect email and password message during signing up (show messages: 
  //'this email is already used' - email
  //'the password hasn't met requirements' - password
  //)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (pathname === '/sign-in' && email && password) {
      dispatch(getUser({email, password}));
    }

    if (pathname === '/sign-up' && email && password) {
      dispatch(createUser({email, password}))
    }
  }

  useEffect(() => {
    if (user.value) {
      navigate('/exercises');
    }
  }, [user.value])

  return (
    <div className="page-compilator">
      <div className="page-compilator__nav">
        <img 
          src="../../../public/images/Logo.svg" 
          alt="Navigation Logo" 
          className='page-compilator__nav-logo'
        />

        <Link 
          to={pathname.includes('sign-up') ? '/sign-in' : '/sign-up'}
          className='page-compilator__nav-button'
        >
          <div className="page-compilator__nav-button-text">
            {pathname.includes('sign-up') ? 'Log In' : 'Sign Up'}
          </div>
        </Link>
      </div>

      <div className="page-compilator__content">
        <div className="page-compilator__title-and-img">
          <h3 className="page-compilator__title">
            Explore the Wonders of Science
          </h3>

          <img 
            src={imageLink} 
            alt="Regestration Image" 
            className='page-compilator__img'
          />
        </div>

        <div className="page-compilator__regestration">
          <h1 className="page-compilator__greeting">{titlesText.titleTop}</h1>

          <p className="page-compilator__message">
            {titlesText.titleBottom}
          </p>

          {titlesText.secondTitleBottom && (
            <p className="page-compilator__message">
              {titlesText.secondTitleBottom}
            </p>
          )}

          {shouldBeForm && (
            <form 
              className="page-compilator__form" 
              onSubmit={handleSubmit}
            >
              {shouldBeEmail && (
                <label className="page-compilator__label">
                  Email
                  <input
                    className="page-compilator__input"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              )}

              {shouldBePassword && (
                <label className="page-compilator__label">
                  Password
                  <input
                    className="page-compilator__input"
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  >
                  </input>

                  <img 
                      src={`../../../public/images/${isPasswordVisible ? 'eye-slash' : 'eye'}.svg`} 
                      alt="" 
                      className='page-compilator__input-eye'
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                </label>
              )}
    
              {pathname.includes('/sign-in') && (
                // ask designers if there is a need for this button disable stylization
                <button className='page-compilator__forgot-password'>
                  <Link to="/reset" className="page-compilator__forgot-password-link">
                    I forgot my password
                  </Link>
                </button>
              )}

              <button type="submit" className="page-compilator__submit">
                {submitMessage}
              </button>
            </form>
          )}

          {(pathname.includes('/sign-in') || pathname.includes('/sign-up')) && (
            <>
              <span className="page-compilator__divider">or</span>

              <ul className="page-compilator__social-buttons">
                {['Google', 'Facebook', 'Apple'].map((button, i) => {
                  return (
                    <li 
                      className="page-compilator__button-container"
                      key={button}
                    >
                      <button 
                        className={classNames("page-compilator__button", {
                          "page-compilator__button--top": !i
                        })}
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
                  {pathname.includes('sign-in') ? "Not a member yet?" : "Already have an account?"}
                </p>

                {/* // ask designers if there is a need for this button disable stylization */}
                <button className="page-compilator__sign-up-button">
                  <Link 
                    to={pathname.includes('sign-in') ? '/sign-up': '/sign-in'} 
                    className="page-compilator__sign-up-link"
                  >
                    {pathname.includes('sign-in') ? 'Sign Up': 'Log In'}
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
            </>
          )}
        </div>
      </div>
  </div>
  );
};
