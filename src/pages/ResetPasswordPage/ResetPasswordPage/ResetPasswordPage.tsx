import { FormEvent, useEffect, useRef, useState } from 'react'
import { PageCompilator } from '../../PageCompilator/PageCompilator';
import './ResetPasswordPage.scss';
import classNames from 'classnames';
import { useAppDispatch } from '../../../store/hooks';
import { Loader } from '../../../components/Loader';

export const ResetPasswordPage = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const [email, setEmail] = useState('');
  //The three below states will be used instead of a slice for a password reseting page / slice can possibly be created, but is it actually going to be needed?
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    //send an email to backend to sent a letter
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
      imageLink={'../../../public/images/reset-girl.png'}
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
