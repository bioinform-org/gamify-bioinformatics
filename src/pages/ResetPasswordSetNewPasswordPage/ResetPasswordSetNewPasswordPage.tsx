import { FormEvent, useEffect, useRef, useState } from 'react';
import { Loader } from '../../components/Loader';
import { PageCompilator } from '../PageCompilator/PageCompilator';
import './ResetPasswordSetNewPasswordPage.scss';
import { useAppDispatch } from '../../store/hooks';
import classNames from 'classnames';
import eyeImg from '../../../public/images/eye.svg';
import eyeSlashImg from '../../../public/images/eye-slash.svg';
import { PasswordRules } from '../../components/PasswordRules';
import { validatePassword } from '../../utils/validation';

export const ResetPasswordSetNewPasswordPage = () => {
  const passwordRef = useRef<HTMLInputElement>(null)
    const [password, setPassword] = useState('');
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    //The three below states will be used instead of a slice for a password reseting page / slice can possibly be created, but is it actually going to be needed?
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useAppDispatch();
  
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      const passwordValidation = validatePassword(password)
    
      if (!passwordValidation) {
        setIsPasswordError(() => 'The password does not meet the requirements');
      }
      
      //set new password request
    }
  
    useEffect(() => {
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
    }, [])
    
  return (
    <PageCompilator
      titlesText={{
        titleTop: 'Set a New Password',
        titleBottom: `Create a password that you'll use to log into your account`,
      }}
      imageLink={'../../../public/images/reset-girl.png'}
    >
      <form 
        className="page-compilator__form" 
        onSubmit={handleSubmit}
      >
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
        </div>

        <div className="page-compilator__password-rules-container">
          <PasswordRules 
            password={password}
          />
        </div>

        {errorMessage && (
          <div className="page-compilator__server-error">
            {errorMessage}
          </div>
        )}

        <button className="page-compilator__submit">
          {isLoading? <Loader shouldBeText={false}/> : "Save"}
        </button>
      </form>
    </PageCompilator>
  );
};
