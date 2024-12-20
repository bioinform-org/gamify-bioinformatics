import './SettingsAccountComponent.scss';
import avatarImg from '../../../public/images/avatar_by_default.svg';

interface Props {}

export const SettingsAccountComponent: React.FC<Props> = () => {
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
            Maya Carter student
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
              defaultValue="Maya Carter Student"
              placeholder='Write down your username'
              className="account__input" 
            />
          </label>

          <label className="account__label">
            Name (optional)
            <input 
              type="text" 
              defaultValue="Maya Carter"
              placeholder='Write down your name and surname'
              className="account__input" 
            />
          </label>

          <label className="account__label">
            Email address*
            <input 
              type="text" 
              defaultValue="mayacarter@gmail.com"
              placeholder='Write down your email'
              className="account__input" 
            />
          </label>

          <button 
            type="submit"
            className='account__button'
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
    </div>
  );
};
