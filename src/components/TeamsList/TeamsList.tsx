import "./TeamsList.scss";
import classNames from "classnames";
import { TeamType } from "../../types/TeamType";

type Props = { onDirectSelect: (id: string) => void, teams: TeamType[], activeButtonId: string };

export const TeamsList: React.FC<Props> = ({ onDirectSelect,teams, activeButtonId }) => {

  const toggleButton = (id: string) => {
    onDirectSelect(id)
  };

  return (
    <section className="channels_list">
      <ul className="channels_list__list">
        {teams.map(({ name, id }) => (
          <li key={name} className="channels_list__element">
            <button
              type="button"
              className={classNames("channels_list__button", {
                "channels_list__button--clicked": activeButtonId === id,
              })}
              onClick={() => toggleButton(id)}
            >
              #{name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
