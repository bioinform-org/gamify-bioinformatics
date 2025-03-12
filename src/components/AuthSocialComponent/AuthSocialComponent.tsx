import "./AuthSocialComponent.scss";

export const AuthSocialComponent: React.FC = () => {
  return (
    <div className="authSocialComponent">
      <span className="page-compilator__divider">or</span>

      <ul className="page-compilator__social-login">
        <li className="page-compilator__social-item">
          <button className="page-compilator__social-button">
            <img
              src="./images/google-logo.svg"
              alt="Google Logo"
              className="page-compilator__social-icon"
            />
            Continue with Google
          </button>
        </li>

        <li className="page-compilator__social-item">
          <button className="page-compilator__social-button">
            <img
              src="./images/facebook-logo.svg"
              alt="Facebook Logo"
              className="page-compilator__social-icon"
            />
            Continue with Facebook
          </button>
        </li>

        <li className="page-compilator__social-item">
          <button className="page-compilator__social-button">
            <img
              src="./images/apple-logo.svg"
              alt="Apple Logo"
              className="page-compilator__social-icon"
            />
            Continue with Apple
          </button>
        </li>
      </ul>
    </div>
  );
};
