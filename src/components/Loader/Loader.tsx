import "./Loader.scss";

type LoaderProps = {
  shouldBeText?: boolean
}

export const Loader: React.FC<LoaderProps> = ({
  shouldBeText = true
}) => (
  <div className="loader">
    <div className="loader__content"></div>
    {shouldBeText && <span>Loading</span>}
  </div>
);
