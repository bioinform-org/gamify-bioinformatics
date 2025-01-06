import { useGoogleLogin } from '@react-oauth/google';
import './AuthViaGoogleFacebookApple.scss';

interface Props {}

export const AuthViaGoogleFacebookApple: React.FC<Props> = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: codeResponse => console.log(codeResponse),
    onError: () => console.log('Login Failed'),
    flow: 'auth-code',
  })

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
        </li>

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
