import "./Leaderboard.scss";

type Props = {
  className?: string;
};

export const Leaderboard: React.FC<Props> = ({ className = "" }) => {
  return (
    <div className={`leaderboard ${className}`.trim()}>
      <h4 className="leaderboard__title">Leaderboard</h4>

      <table className="leaderboard__table">
        <thead>
          <tr>
            <th>Rank</th>
            <th></th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                src="/images/1st-place-medal.svg"
                alt="1st place medal"
              />
            </td>
            <td>
              <img
                className="avatar"
                src="/images/emma-johnson.jpg"
                alt="Emma Johnson"
              />
              Emma Johnson
            </td>
            <td>155</td>
          </tr>
          <tr>
            <td>
              <img
                src="/images/2nd-place-medal.svg"
                alt="2st place medal"
              />
            </td>
            <td>
              <img
                className="avatar"
                src="/images/emma-johnson.jpg"
                alt="Liam Smith"
              />
              Liam Smith
            </td>
            <td>144</td>
          </tr>
          <tr>
            <td>
              <img
                src="/images/3rd-place-medal.svg"
                alt="3st place medal"
              />
            </td>
            <td>
              <img
                className="avatar"
                src="/images/emma-johnson.jpg"
                alt="Lucas Martinez"
              />
              Lucas Martinez
            </td>
            <td>80</td>
          </tr>
          <tr>
            <td>4</td>
            <td>
              <img
                className="avatar"
                src="/images/emma-johnson.jpg"
                alt="Noah Brown"
              />
              Noah Brown
            </td>
            <td>40</td>
          </tr>
          <tr>
            <td>5</td>
            <td>
              <img
                className="avatar"
                src="/images/emma-johnson.jpg"
                alt="Isabella Garcia"
              />
              Isabella Garcia
            </td>
            <td>25</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
