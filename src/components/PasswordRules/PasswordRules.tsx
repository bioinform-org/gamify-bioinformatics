import chechImg from '../../../public/images/check.svg'
import chechFilledImg from '../../../public/images/check-filled.svg'
import { passwordHasDigit, passwordHasLowerCaseLetter, passwordHasSpecialChar, passwordHasUpperCaseLetter, passwordLongEnough } from '../../utils/regex';
import './PasswordRules.scss';

interface Props {
  password: string,
}

export const PasswordRules: React.FC<Props> = ({
  password,
}) => {
  return (
    <div 
      className="password-rules"
    >
      <div 
        className="password-rules__block"
      >
        <img 
          src={passwordLongEnough.test(password)
            ? chechFilledImg
            : chechImg
          } 
          alt="check" 
          className="password-rules__img"
        />

        <div 
          className="password-rules__text"
        >
          Your password must be at least 8 characters long
        </div>
      </div>

      <div 
        className="password-rules__block"
      >
        <img 
          src={passwordHasLowerCaseLetter.test(password)
            && passwordHasUpperCaseLetter.test(password)
              ? chechFilledImg 
              : chechImg
          }
          alt="check" 
          className="password-rules__img"
        />

        <div 
          className="password-rules__text"
        >
          Include at least one uppercase and one lowercase letter
        </div>
      </div>

      <div 
        className="password-rules__block"
      >
        <img 
          src={passwordHasSpecialChar.test(password)
            ? chechFilledImg
            : chechImg
          }
          alt="check" 
          className="password-rules__img"
        />

        <div 
          className="password-rules__text"
        >
          Include at least one special character
        </div>
      </div>
      
      <div 
        className="password-rules__block"
      >
        <img 
          src={passwordHasDigit.test(password)
            ? chechFilledImg
            : chechImg
          } 
          alt="check" 
          className="password-rules__img"
        />

        <div 
          className="password-rules__text"
        >
          Include at least one number
        </div>
      </div>
    </div>
  );
};
