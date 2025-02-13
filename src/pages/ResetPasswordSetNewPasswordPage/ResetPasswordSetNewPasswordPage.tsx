import { FormEvent, useEffect, useRef, useState } from 'react';
import { Loader } from '../../components/Loader';
import { PageCompilator } from '../PageCompilator/PageCompilator';
import './ResetPasswordSetNewPasswordPage.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import classNames from 'classnames';
import eyeImg from '../../../public/images/eye.svg';
import eyeSlashImg from '../../../public/images/eye-slash.svg';
import { PasswordRules } from '../../components/PasswordRules';
import { validatePassword } from '../../utils/validation';
import { selectUser, updateUser } from '../../store/features/userSlice';
import { useNavigate, useParams } from 'react-router-dom';

export const ResetPasswordSetNewPasswordPage = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const { tokenId } = useParams()
  const [password, setPassword] = useState('');
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState('');
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const passwordValidation = validatePassword(password)
  
    if (!passwordValidation) {
      return setIsPasswordError(() => 'The password does not meet the requirements');
    }

    if (!tokenId) {
      return;
    }
    
    dispatch(updateUser({ 
      body: { password },
      propToken: tokenId,
    }));
  }

  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (user.value) {
      navigate('/sign-in');
    }
  }, [user.value])
    
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

        {user.errorMessage && (
          <div className="page-compilator__server-error">
            {user.errorMessage}
          </div>
        )}

        <button className="page-compilator__submit">
          {user.isLoading? <Loader shouldBeText={false}/> : "Save"}
        </button>
      </form>
    </PageCompilator>
  );
};
