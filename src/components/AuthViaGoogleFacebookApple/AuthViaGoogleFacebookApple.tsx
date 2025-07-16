import { useGoogleLogin } from '@react-oauth/google';
import './AuthViaGoogleFacebookApple.scss';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';
import facebookImg from '/images/facebook-logo.svg';
import facebookDisabledImg from '/images/facebook-logo-grey.svg';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props {}

export const AuthViaGoogleFacebookApple: React.FC<Props> = () => {
  const [isFacebookButtonDisabled] = useState(false)
  const googleLogin = useGoogleLogin({
    onSuccess: codeResponse => console.log(codeResponse),
    onError: () => console.log('Login Failed'),
    flow: 'auth-code',
  })

  const facebookLogin = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    console.log(response);
  }

  // token

  // const googleLogin = useGoogleLogin({
  //   onSuccess: async tokenResponse => {
  //     console.log(tokenResponse);
  //     // fetching userinfo can be done on the client or the server
  //     const userInfo = await axios
  //       .get('https://www.googleapis.com/oauth2/v3/userinfo', {
  //         headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
  //       })
  //       .then(res => res.data);

  //     console.log(userInfo);
  //   },
  // })


  // code 

  // const googleLoginBackend = useGoogleLogin({
  //   onSuccess: async ({ code }) => {
  //     const tokens = await axios.post('http://localhost:3001/auth/google', {
  //       code,
  //     });
  
  //     console.log(tokens);
  //   },
  //   flow: 'auth-code',
  // });


  return (
    <>
      <span className="page-compilator__divider">or</span>

      <ul className="page-compilator__social-buttons">
        <li 
          className="page-compilator__button-container"
        >
          <button 
            className="page-compilator__button page-compilator__button--top"
            onClick={() => googleLogin()}
          >
            <div 
              className="page-compilator__button-img page-compilator__button-img--google"
            ></div>

            <div className="page-compilator__button-text">
              Continue with Google
            </div>
          </button>
        </li>

        <li 
          className="page-compilator__button-container"
        >
          <FacebookLogin 
            appId={import.meta.env.VITE_FACEBOOK_APP_ID}
            fields='email,name,picture'
            callback={facebookLogin}
            autoLoad={false}
            render={renderProps => (
              <button 
                className="page-compilator__button"
                onClick={renderProps.onClick}
                disabled={isFacebookButtonDisabled}
              >
                <img 
                  src={isFacebookButtonDisabled ? facebookDisabledImg : facebookImg}
                  alt="facebook"
                  className='page-compilator__button-img page-compilator__button-img--facebook'
                />
    
                <div className="page-compilator__button-text">
                  Continue with Facebook
                </div>
              </button>
            )}
          />
        </li>


        {/* <li 
          className="page-compilator__button-container"
        >
          <button 
            className="page-compilator__button"
          >
            <div 
              className={`page-compilator__button-img page-compilator__button-img--facebook}`}
            ></div>

            <div className="page-compilator__button-text">
              Continue with Facebook
            </div>
          </button>
        </li> */}

        <li 
          className="page-compilator__button-container"
        >
          <button 
            className="page-compilator__button"
          >
            <div 
              className='page-compilator__button-img page-compilator__button-img--apple'
            ></div>

            <div className="page-compilator__button-text">
              Continue with Apple
            </div>
          </button>
        </li>
      </ul>
    </>
  );
};
