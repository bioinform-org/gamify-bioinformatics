import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./Leaderboard.scss";

type Props = {
  className?: string;
};

export const Leaderboard: React.FC<Props> = ({ className = "" }) => {
  const users = useSelector((state: RootState) => state.users.value);

  const sorted = [...users].sort((a, b) => b.scorePoints - a.scorePoints);

  const medals = [
    "/images/1st-place-medal.svg",
    "/images/2nd-place-medal.svg",
    "/images/3rd-place-medal.svg",
  ];

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
          {sorted.map((user, index) => {
            const rank = index + 1;
            const medal = medals[index];

            return (
              <tr key={user.id}>
                <td>
                  {medal ? (
                    <img src={medal} alt={`${rank} place medal`} />
                  ) : (
                    rank
                  )}
                </td>
                <td>
                  <img
                    className="avatar"
                    src={user.photo ?? "/images/default-avatar.png"}
                    alt={user.name}
                  />
                  {user.name}
                </td>
                <td>{user.scorePoints}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
