import { useState } from "react";
import "./ChannelsList.scss";
import classNames from "classnames";
import { useAppSelector } from '../../store/hooks';


type Props = { onChannelSelect: (id: string) => void };

export const ChannelsList: React.FC<Props> = ({ onChannelSelect }) => {
  const [activeButtonId, setActiveButtonId] = useState<string | null>(null);
  const channels = useAppSelector((state) => state.channels.channels);

  const toggleButton = (id: string) => {
    setActiveButtonId(id);
    onChannelSelect(id)
  };

  return (
    <section className="channels_list">
      <ul className="channels_list__list">
        {channels.map(({ id, label }) => (
          <li key={id} className="channels_list__element">
            <button
              type="button"
              className={classNames("channels_list__button", {
                "channels_list__button--clicked": activeButtonId === id,
              })}
              onClick={() => toggleButton(id)}
            >
              #{label}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
