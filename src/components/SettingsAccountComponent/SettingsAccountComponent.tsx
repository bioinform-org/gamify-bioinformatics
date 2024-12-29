import './SettingsAccountComponent.scss';
import avatarImg from '../../../public/images/avatar_by_default.svg';
import closeImg from '../../../public/images/close-button.svg';
import eyeImg from '../../../public/images/eye.svg';
import eyeSlashImg from '../../../public/images/eye-slash.svg';
import { PopUpContainer } from '../PopUpContainer';
import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/features/userSlice';

interface Props {}

export const SettingsAccountComponent: React.FC<Props> = () => {
  const user = useAppSelector(selectUser);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState(user.value?.username);
  const [name, setName] = useState(user.value?.name || '');
  const [email, setEmail] = useState(user.value?.email || '');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // const dispatch = useAppDispatch();

  
  return (
    <div className="account">
      <div className="account__details">
        <div className="account__title">Account Details</div>

        <div className="account__select-photo-and-username">
          <div className="account__select-photo">
            <img 
              className='account__shown-photo'
              src={avatarImg} 
              alt="Avatar" 
            />
            <div className="account__select-message">
              Choose photo
            </div>
          </div>

          <div className="account__username">
            {user.value?.username}
          </div>
        </div>

        <form 
          className='account__change-form'
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label className="account__label">
            Username*
            <input 
              type="text" 
              value={userName}
              placeholder='Write down your username'
              className="account__input" 
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>

          <label className="account__label">
            Name (optional)
            <input 
              type="text" 
              value={name}
              placeholder='Write down your name and surname'
              className="account__input" 
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="account__label">
            Email address*
            <input 
              type="text" 
              value={email}
              placeholder='Write down your email'
              className="account__input" 
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <button 
            type="submit"
            className='account__button'
            onClick={() => setPopUpOpen(true)}
          >
            Save
          </button>
        </form>
      </div>

      <div className="account__separator" />

      <div className="account__delete">
        <div className="account__title">Delete Account</div>

        <p className='account__delete-warning-message'>
          Are you sure you want to delete your account? If you proceed, all your progress and data will be permanently lost. This action cannot be undone, and your account cannot be recovered. Please confirm if you wish to continue.
        </p>

        <button 
          className='account__button'
        >
          Delete Account
        </button>
      </div>

      {popUpOpen && (
        <PopUpContainer>
          <div className="account__pop-up">
            <div className="account__pop-up-close">
              <img 
                src={closeImg}
                alt="close button"
                className="account__pop-up-close-img" 
                onClick={() => setPopUpOpen(false)}
              />
            </div>

            <form
              className="account__pop-up-form"
            >
              <div className="account__pop-up-title">
                To change your email, please enter your password
              </div>

              <div  
                className="account__pop-up-input-container"
              >
                <input 
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  placeholder="Enter your password"
                  className="account__pop-up-input" 
                  onChange={(e) => setPassword(e.target.value)}
                />

                <img 
                  src={isPasswordVisible ? eyeSlashImg : eyeImg} 
                  alt="Show password button" 
                  className='account__pop-up-input-eye'
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              </div>

              <div  
                className="account__pop-up-btns"
              >
                <button 
                  className="account__pop-up-btn-close"
                  onClick={() => setPopUpOpen(false)}
                >
                  Cancel
                </button>

                <button 
                  className="account__pop-up-btn-update"
                  onClick={() => setPopUpOpen(false)}
                  disabled={password.length === 0}
                >
                  Update Email
                </button>
              </div>
            </form>
          </div>
        </PopUpContainer>
      )}
    </div>
  );
};
