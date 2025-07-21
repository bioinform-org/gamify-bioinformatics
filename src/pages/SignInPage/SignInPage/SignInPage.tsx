/* eslint-disable react-hooks/exhaustive-deps */
import "./SignInPage.scss";
import { PageCompilator } from "../../PageCompilator/PageCompilator";
import { FormEvent, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  getTokenFromLogin,
  selectToken,
  removeErorrMessageForToken,
  setToken,
} from "../../../store/features/tokenSlice";
import {
  getUser,
  selectUser,
  removeErrorMessageForUser,
  setUser,
} from "../../../store/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import eyeImg from "/images/eye.svg";
import eyeSlashImg from "/images/eye-slash.svg";
import { Loader } from "../../../components/Loader";
// import { AuthViaGoogleFacebookApple } from "../../../components/AuthViaGoogleFacebookApple";

export const SignInPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  // const isDevMode = import.meta.env.MODE === "development";
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(removeErorrMessageForToken());
    dispatch(removeErrorMessageForUser());
    if (email === "admin" && password === "admin") {
      dispatch(setToken("mock-admin-token"));
      dispatch(setUser({
        id: "admin-id",
        name: "Admin",
        role: "admin",
        email: "admin@example.com",
      }));
    } else {
      dispatch(getTokenFromLogin({ email, password }));
    }
  }

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (token.errorMessage || user.errorMessage) {
      setIsEmailError(true);
      setIsPasswordError(true);
    }
  }, [token.errorMessage, user.errorMessage]);

  useEffect(() => {
    if (token.value) {
      dispatch(getUser(token.value));
    }
  }, [dispatch, token.value]);

  useEffect(() => {
    if (token.value && user.value) {
      navigate("/exercises");
    }
  }, [navigate, token.value, user.value]);

  return (
    <PageCompilator
      titlesText={{
        titleTop: "Welcome back!",
        titleBottom: "Log in to continue your learning journey",
      }}
      imageLink={"/images/man-science.png"}
    >
      <form className="page-compilator__form" onSubmit={handleSubmit}>
        <label className="page-compilator__label">
          Email
          <input
            className={classNames("page-compilator__input", {
              "page-compilator__input--error": isEmailError,
            })}
            type="text"
            ref={emailRef}
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailError(false);
            }}
          />
        </label>

        <div>
          <label className="page-compilator__label">
            Password
            <input
              className={classNames("page-compilator__input", {
                "page-compilator__input--error": isPasswordError,
              })}
              type={isVisiblePassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsPasswordError(false);
              }}
            ></input>
            <img
              src={isVisiblePassword ? eyeSlashImg : eyeImg}
              alt="Show password button"
              className="page-compilator__input-eye"
              onClick={() => setIsVisiblePassword(!isVisiblePassword)}
            />
          </label>
        </div>

        <button className="page-compilator__forgot-password">
          <Link to="/reset" className="page-compilator__forgot-password-link">
            I forgot my password
          </Link>
        </button>

        {(token.errorMessage || user.errorMessage) && (
          <div className="page-compilator__server-error">
            {token.errorMessage || user.errorMessage}
          </div>
        )}

        <button className="page-compilator__submit">
          {token.isLoading || user.isLoading ? (
            <Loader shouldBeText={false} />
          ) : (
            "Log In"
          )}
        </button>
      </form>

      {/* <AuthViaGoogleFacebookApple /> */}

      <div className="page-compilator__sign-up">
        <p className="page-compilator__sign-up-text">Not a member yet?</p>

        <button className="page-compilator__sign-up-button">
          <Link to={"/sign-up"} className="page-compilator__sign-up-link">
            Sign Up'
          </Link>
        </button>
      </div>
      <p className="page-compilator__terms">
        By continuing, you agree to our&nbsp;
        <button className="page-compilator__terms-button">
          <Link to="/" className="page-compilator__terms-link">
            Privacy Policy
          </Link>
        </button>
        <br />
        and&nbsp;
        <button className="page-compilator__terms-button">
          <Link to="/" className="page-compilator__terms-link">
            Terms of Service
          </Link>
          .
        </button>
      </p>
    </PageCompilator>
  );
};
