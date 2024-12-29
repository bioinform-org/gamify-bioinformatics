import { Reward } from "../../types/ProductType";
import "./Rewards.scss";

type Props = {
  className?: string;
  rewards: Reward[];
};

export const Rewards: React.FC<Props> = ({ className = "", rewards }) => {
  return (
    <div className={`rewards ${className}`.trim()}>
      <h4 className="rewards__title">Rewards</h4>
      <ul className="rewards__list">
        {rewards.map((reward) => (
          <li className="rewards__item">
            <img
              className="rewards__item-img"
              src={reward.imagePath}
              alt={reward.title}
            />
            <span className="rewards__item-title">{reward.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
