import { Link, useLocation } from 'react-router-dom';
import './PageCompilator.scss';

type PageCopilatorProps = {
  titlesText: {
    titleTop: string,
    titleBottom: string,
    secondTitleBottom?: string,
  },
  imageLink: string,
  children?: React.ReactNode,
}

export const PageCompilator: React.FC<PageCopilatorProps> = ({
  titlesText,
  imageLink,
  children,
}) => {
  const { pathname } = useLocation();

  return (
    <div className="page-compilator">
      <div className="page-compilator__nav">
        <img
          src="/images/Logo.svg"
          alt="Navigation Logo"
          className="page-compilator__nav-logo"
        />

        <Link
          to={pathname.includes("sign-up") ? "/sign-in" : "/sign-up"}
          className="page-compilator__nav-button"
        >
          <div className="page-compilator__nav-button-text">
            {pathname.includes("sign-up") ? "Log In" : "Sign Up"}
          </div>
        </Link>
      </div>

      <div className="page-compilator__content">
        <div className="page-compilator__title-and-img">
          <h3 className="page-compilator__title">
            Explore the Wonders of Science
          </h3>

          <img
            src={imageLink}
            alt="Regestration img"
            className="page-compilator__img"
          />
        </div>

        <div className="page-compilator__regestration">
          <h1 className="page-compilator__greeting">
            {titlesText.titleTop}
          </h1>

          <p className="page-compilator__message">{titlesText.titleBottom}</p>

          {titlesText.secondTitleBottom && (
            <p className="page-compilator__message">
              {titlesText.secondTitleBottom}
            </p>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};
