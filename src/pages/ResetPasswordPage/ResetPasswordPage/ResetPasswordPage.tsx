import { FormEvent, useEffect, useRef, useState } from 'react'
import { PageCompilator } from '../../PageCompilator/PageCompilator';
import './ResetPasswordPage.scss';
import classNames from 'classnames';
import { Loader } from '../../../components/Loader';
import { sendEmailForPasswordReset } from '../../../api';
import { validateEmail } from '../../../utils/validation';
import { useNavigate } from 'react-router-dom';

export const ResetPasswordPage = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
 
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const emailValidation = validateEmail(email);

    if (!emailValidation) {
      return setEmailError(() => 'Please enter a valid email');
    }

    setIsLoading(true);
    setErrorMessage('');
    sendEmailForPasswordReset(email)
      .then(() => navigate('/reset/email-sent'))
      .catch(() => {
        setEmailError(' ');
        setErrorMessage('There is no account with such an email. Please check your typed email.')
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, [])

  return (
    <PageCompilator 
      titlesText={{
        titleTop: 'Forgot password',
        titleBottom: 'Enter your email to reset your password',
      }}
      imageLink={'/images/reset-girl.png'}
    >
      <form 
        className="page-compilator__form" 
        onSubmit={handleSubmit}
      >
        <label className="page-compilator__label">
          Email
          <input
            className={classNames("page-compilator__input", {
              "page-compilator__input--error": emailError,
            })}
            type="text"
            ref={emailRef}
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
            }}
          />

          {emailError && <p className="page-compilator__error-message">{emailError}</p>}
        </label>

        {errorMessage && (
          <div className="page-compilator__server-error">
            {errorMessage}
          </div>
        )}

        <button className="page-compilator__submit">
          {isLoading? <Loader shouldBeText={false}/> : "Reset Password"}
        </button>
      </form>
    </PageCompilator>
  );
};
