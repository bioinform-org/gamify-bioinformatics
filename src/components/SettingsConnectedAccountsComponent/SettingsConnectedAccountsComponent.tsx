import './SettingsConnectedAccountsComponent.scss';
import googleImg from '../../../public/images/google-logo.svg';
import facebookImg from '../../../public/images/facebook-logo.svg';
import appleImg from '../../../public/images/apple-logo.svg';

interface Props {}

export const SettingsConnectedAccountsComponent: React.FC<Props> = () => {
  return (
    <div className="connected-accounts">
      <div className="connected-accounts__titles">
        <div className="connected-accounts__main-title">
          Connected accounts
        </div>

        <div className="connected-accounts__subtitle">
          These linked accounts allow you to log in to BioInform.
        </div>
      </div>
      
      <div className="connected-accounts__accounts">
        <div className="connected-accounts__account-group">
          <div className="connected-accounts__top">
            <div 
              className="connected-accounts__top-icon-and-title"
            >
              <img 
                src={googleImg} 
                alt="google"
                className="connected-accounts__top-icon"
              />

              <span 
                className="connected-accounts__top-title"
              >
                Google
              </span>
            </div>

            <div className="connected-accounts__top-email">
              mayacarter@gmail.com
            </div>
          </div>
          
          <div className="connected-accounts__button connected-accounts__button--disconnected">
            Disconnect
          </div>
        </div>

        <div className="connected-accounts__account-group">
          <div className="connected-accounts__top">
            <div 
              className="connected-accounts__top-icon-and-title"
            >
              <img 
                src={facebookImg} 
                alt="facebook"
                className="connected-accounts__top-icon"
              />

              <span 
                className="connected-accounts__top-title"
              >
                Facebook
              </span>
            </div>
            <div className="connected-accounts__top-email"></div>
          </div>
          
          <div className="connected-accounts__button">
            Connect
          </div>
        </div>

        <div className="connected-accounts__account-group">
          <div className="connected-accounts__top">
            <div 
              className="connected-accounts__top-icon-and-title"
            >
              <img 
                src={appleImg} 
                alt="apple"
                className="connected-accounts__top-icon"
              />

              <span 
                className="connected-accounts__top-title"
              >
                Apple
              </span>
            </div>
            <div className="connected-accounts__top-email"></div>
          </div>
          
          <div className="connected-accounts__button">
            Connect
          </div>
        </div>
      </div>
    </div>
  );
};
