import "./DirectMessages.scss";
import classNames from "classnames";
import { DirectMessage } from "../../store/features/directMessagesSlice";

type Props = { onDirectSelect: (id: string) => void, directMessages: DirectMessage[], activeButtonId: string };

export const DirectMessages: React.FC<Props> = ({ onDirectSelect, directMessages, activeButtonId }) => {

  const toggleButton = (id: string) => {
    onDirectSelect(id)
  };

  return (
    <section className="channels_list">
      <ul className="channels_list__list">
        {directMessages.map(({ name, userName }) => (
          <li key={userName} className="channels_list__element">
            <button
              type="button"
              className={classNames("channels_list__button", {
                "channels_list__button--clicked": activeButtonId === userName,
              })}
              onClick={() => toggleButton(userName)}
            >
              #{name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
