import './InfoBlock.scss';

export const InfoBlock = () => {
  return (
    <div className="info-block">
      <div className="info-block__text-container">
        <p className="info-block__text">Topic:</p>
        <p className="info-block__text--bold">Name</p>
      </div>

      <div className="info-block__text-container">
        <p className="info-block__text">Estimated time:</p>
        <p className="info-block__text--bold">Number</p>
      </div>
      <p className="info-block__progress-bar-text">Exercise progress</p>
      <div className="info-block__progress-bar">
        <div className="info-block__progress-bar-line">
          <div
            className="info-block__progress-bar-fill"
            style={{ width: `${20}%` }}
          ></div>
        </div>
        <span className="info-block__progress-bar-label">{20}%</span>
      </div>
    </div>
  );
}