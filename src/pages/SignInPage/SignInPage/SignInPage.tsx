import { Link } from "react-router-dom";
import "./SignInPage.scss";

type Props = {};

export const SignInPage: React.FC<Props> = () => {
  return (
    <div className="sign-in page">
      <div className="container sign-in__container">
        <div className="sign-in__explore">
          <span className="sign-in__text title-h3">
            Explore the Wonders of Science
          </span>
        </div>

        <div className="sign-in__content">
          <h1 className="sign-in__title title-h1">Welcome back!</h1>

          <p className="sign-in__subtitle">
            Log in to continue your learning journey
          </p>

          <form className="sign-in__form" action="">
            <label className="sign-in__label">
              Email
              <input
                className="sign-in__input"
                type="email"
                placeholder="Enter your email address"
              />
            </label>

            <label className="sign-in__label">
              Password
              <input
                className="sign-in__input"
                type="password"
                placeholder="Enter your password"
              />
              <svg
                className="sign-in__input-eye"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.3211 9.74688C19.2937 9.68516 18.632 8.21719 17.1609 6.74609C15.2008 4.78594 12.725 3.75 9.99999 3.75C7.27499 3.75 4.79921 4.78594 2.83905 6.74609C1.36796 8.21719 0.703118 9.6875 0.678899 9.74688C0.643362 9.82681 0.625 9.91331 0.625 10.0008C0.625 10.0883 0.643362 10.1748 0.678899 10.2547C0.706243 10.3164 1.36796 11.7836 2.83905 13.2547C4.79921 15.2141 7.27499 16.25 9.99999 16.25C12.725 16.25 15.2008 15.2141 17.1609 13.2547C18.632 11.7836 19.2937 10.3164 19.3211 10.2547C19.3566 10.1748 19.375 10.0883 19.375 10.0008C19.375 9.91331 19.3566 9.82681 19.3211 9.74688ZM9.99999 15C7.5953 15 5.49452 14.1258 3.75546 12.4023C3.0419 11.6927 2.43483 10.8836 1.95312 10C2.4347 9.11636 3.04179 8.30717 3.75546 7.59766C5.49452 5.87422 7.5953 5 9.99999 5C12.4047 5 14.5055 5.87422 16.2445 7.59766C16.9595 8.307 17.5679 9.11619 18.0508 10C17.4875 11.0516 15.0336 15 9.99999 15ZM9.99999 6.25C9.25831 6.25 8.53329 6.46993 7.9166 6.88199C7.29992 7.29404 6.81927 7.87971 6.53544 8.56494C6.25162 9.25016 6.17735 10.0042 6.32205 10.7316C6.46674 11.459 6.82389 12.1272 7.34834 12.6517C7.87279 13.1761 8.54097 13.5333 9.2684 13.6779C9.99583 13.8226 10.7498 13.7484 11.4351 13.4645C12.1203 13.1807 12.7059 12.7001 13.118 12.0834C13.5301 11.4667 13.75 10.7417 13.75 10C13.749 9.00576 13.3535 8.05253 12.6505 7.34949C11.9475 6.64645 10.9942 6.25103 9.99999 6.25ZM9.99999 12.5C9.50554 12.5 9.02219 12.3534 8.61107 12.0787C8.19994 11.804 7.87951 11.4135 7.69029 10.9567C7.50107 10.4999 7.45157 9.99723 7.54803 9.51227C7.64449 9.02732 7.88259 8.58186 8.23222 8.23223C8.58186 7.8826 9.02731 7.6445 9.51227 7.54804C9.99722 7.45157 10.4999 7.50108 10.9567 7.6903C11.4135 7.87952 11.804 8.19995 12.0787 8.61107C12.3534 9.0222 12.5 9.50555 12.5 10C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 9.99999 12.5Z"
                  fill="#4F4F51"
                />
              </svg>
            </label>
            <Link to="/reset" className="sign-in__forgot-password">
              I forgot my password
            </Link>

            <button type="submit" className="sign-in__submit">
              Log In
            </button>
          </form>

          <span className="sign-in__divider">or</span>

          <ul className="social-buttons">
            <li className="social-buttons__item">
              <button className="social-buttons__button social-buttons__button--google">
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <g clip-path="url(#clip0_1759_5546)">
                    <path
                      d="M19.5367 10.1871C19.5367 9.36767 19.4703 8.76973 19.3264 8.14966H9.96973V11.848H15.4619C15.3512 12.7671 14.7532 14.1512 13.4245 15.0813L13.4058 15.2051L16.3642 17.4969L16.5692 17.5174C18.4516 15.7789 19.5367 13.221 19.5367 10.1871Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M9.96957 19.9312C12.6603 19.9312 14.9191 19.0453 16.569 17.5173L13.4243 15.0812C12.5828 15.6681 11.4533 16.0777 9.96957 16.0777C7.33422 16.0777 5.09751 14.3393 4.30018 11.9365L4.18331 11.9464L1.10712 14.3271L1.06689 14.439C2.70567 17.6944 6.07186 19.9312 9.96957 19.9312Z"
                      fill="#34A853"
                    />
                    <path
                      d="M4.30017 11.9366C4.08978 11.3165 3.96803 10.6521 3.96803 9.96559C3.96803 9.27902 4.08978 8.61467 4.2891 7.9946L4.28352 7.86254L1.16879 5.4436L1.06688 5.49208C0.391464 6.84299 0.00390625 8.36002 0.00390625 9.96559C0.00390625 11.5712 0.391464 13.0881 1.06688 14.439L4.30017 11.9366Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M9.96957 3.85336C11.8409 3.85336 13.1032 4.66168 13.8229 5.33718L16.6354 2.59107C14.9081 0.985496 12.6603 0 9.96957 0C6.07186 0 2.70567 2.23672 1.06689 5.49214L4.28911 7.99466C5.09751 5.59183 7.33422 3.85336 9.96957 3.85336Z"
                      fill="#EB4335"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1759_5546">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Continue with Google
              </button>
            </li>
            <li className="social-buttons__item">
              <button className="social-buttons__button social-buttons__button--facebook">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1759_5637)">
                    <path
                      d="M20 10C20 4.47719 15.5228 0 10 0C4.47719 0 0 4.47719 0 10C0 14.9913 3.65687 19.1284 8.4375 19.8785V12.8906H5.89844V10H8.4375V7.79688C8.4375 5.29063 9.93047 3.90625 12.2147 3.90625C13.3088 3.90625 14.4531 4.10156 14.4531 4.10156V6.5625H13.1922C11.9499 6.5625 11.5625 7.33336 11.5625 8.12422V10H14.3359L13.8926 12.8906H11.5625V19.8785C16.3431 19.1284 20 14.9913 20 10Z"
                      fill="#1877F2"
                    />
                    <path
                      d="M13.8926 12.8906L14.3359 10H11.5625V8.12422C11.5625 7.33328 11.9499 6.5625 13.1922 6.5625H14.4531V4.10156C14.4531 4.10156 13.3088 3.90625 12.2146 3.90625C9.93047 3.90625 8.4375 5.29063 8.4375 7.79688V10H5.89844V12.8906H8.4375V19.8785C8.95439 19.9595 9.4768 20.0001 10 20C10.5232 20.0001 11.0456 19.9595 11.5625 19.8785V12.8906H13.8926Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1759_5637">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Continue with Facebook
              </button>
            </li>
            <li className="social-buttons__item">
              <button className="social-buttons__button social-buttons__button--apple">
                <svg width="21" height="20" viewBox="0 0 21 20">
                  <g clip-path="url(#clip0_1759_3871)">
                    <path
                      d="M15.7438 10.6051C15.7718 13.626 18.3939 14.6313 18.4229 14.6441C18.4007 14.715 18.0039 16.0767 17.0415 17.4832C16.2095 18.6993 15.346 19.9109 13.9857 19.9359C12.6492 19.9606 12.2193 19.1434 10.6912 19.1434C9.1635 19.1434 8.68598 19.9109 7.42071 19.9606C6.10769 20.0103 5.10782 18.6457 4.26896 17.434C2.55468 14.9557 1.24464 10.4309 3.00369 7.37651C3.87753 5.85968 5.43925 4.89924 7.13423 4.8746C8.42357 4.85003 9.64058 5.74203 10.4288 5.74203C11.2165 5.74203 12.6954 4.66933 14.2501 4.82686C14.9009 4.85397 16.7279 5.08971 17.9011 6.80692C17.8065 6.86552 15.7211 8.07956 15.7438 10.6051M13.2318 3.18724C13.929 2.34343 14.3981 1.16883 14.2701 0C13.2653 0.040381 12.0503 0.669587 11.3295 1.51289C10.6836 2.25975 10.118 3.45505 10.2706 4.6007C11.3906 4.68737 12.5347 4.03156 13.2318 3.18724Z"
                      fill="#1D1D1F"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1759_3871">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Continue with Apple
              </button>
            </li>
          </ul>

          <p className="sign-in__sign-up">
            Not a member yet?{" "}
            <Link to="/sign-up" className="sign-in__sign-up-link">
              Sign Up
            </Link>
          </p>

          <p className="sign-in__terms">
            By continuing, you agree to our <a href="#">Privacy Policy</a> and{" "}
            <br />
            <a href="#">Terms of Service</a>.
          </p>
        </div>
      </div>
    </div>
  );
};
