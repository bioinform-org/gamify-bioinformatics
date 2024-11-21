import { Link, useLocation } from 'react-router-dom';
import './PageCompilator.scss';
import { useState } from 'react';
import classNames from 'classnames';

type PageCopilatorProps = {
  titlesText: {
    titleTop: string,
    titleBottom: string,
  },
  imageLink: string,
  submitMessage: string,
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

          {shouldBeForm && (
            <form className="page-compilator__form" action="">
              {shouldBeEmail && (
                <label className="page-compilator__label">
                  Email
                  <input
                    className="page-compilator__input"
                    type="email"
                    placeholder="Enter your email address"
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
                <Link to="/reset" className="page-compilator__forgot-password">
                  I forgot my password
                </Link>
              )}

              <button type="submit" className="page-compilator__submit">
                {submitMessage}
              </button>
            </form>
          )}

          {(pathname.includes('/sign-in') || pathname.includes('/sign-up')) && (
            <>
              <span className="page-compilator__divider">or</span>

              {/* Additional information: dont forget to finish button stylization. */}
              {/* Additional information: dont forget to finish button stylization. */}
              {/* Additional information: dont forget to finish button stylization. */}
              <ul className="page-compilator__social-buttons">
                {['Google', 'Facebook', 'Apple'].map((button, i) => {
                  return (
                    <li className="page-compilator__button-container">
                      <button 
                        className={classNames("page-compilator__button", {
                          "page-compilator__button--top": !i
                        })}
                      >
                        <img 
                          src={`../../../public/images/${button.toLowerCase()}-logo.svg`} 
                          alt={`${button} Logo`} 
                          className="page-compilator__button-img" 
                        />

                        <div className="page-compilator__button-text">
                          Continue with {button}
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>

              <p className="page-compilator__sign-up">
                <div className="page-compilator__sign-up-text">
                  {pathname.includes('sign-in') ? "Not a member yet?" : "Already have an account?"}
                </div>

                <Link 
                  to={pathname.includes('sign-in') ? '/sign-up': '/sign-in'} 
                  className="page-compilator__sign-up-link"
                >
                  {pathname.includes('sign-in') ? 'Sign Up': 'Log In'}
                </Link>
              </p>

              <p className="page-compilator__terms">
                By continuing, you agree to our 
                <a 
                  href="#"
                  className='page-compilator__terms-link'
                >
                  Privacy Policy
                </a> 

                <br />

                and&nbsp;
                <a 
                  href="#"
                  className='page-compilator__terms-link'
                >
                  Terms of Service
                </a>.
              </p>
            </>
          )}
        </div>
      </div>
  </div>
  );
};
