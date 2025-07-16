import "./DashboardPage.scss";
import { useEffect, useState } from "react";
import { PageLayout } from "../PageLayout";
import { Rewards } from "../../components/Rewards";
import { Reward } from "../../types/ProductType";
import { Leaderboard } from "../../components/Leaderboard";
import { Progress } from "../../components/Progress";

// interface Props {}

export const DashboardPage: React.FC<Props> = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // DON`T forget to use axios here instead fetch
    fetch("/api/rewards.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => setRewards(data))
      .catch(() => {
        setErrorMessage(
          "No rewards available at the moment. Please check back later."
        );
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <PageLayout
      pageTitle="Dashboard"
      isLoading={isLoading}
      errorMessage={errorMessage}
    >
      <div className="dashboard">
        <div className="dashboard__welcome">
          <h4 className="dashboard__welcome-title">Welcome!</h4>

          <p className="dashboard__welcome-text">
            See your progress and track how your classmates are doing.
          </p>

          <ul className="dashboard__welcome-list">
            <li className="dashboard__welcome-item">
              <span className="dashboard__welcome-item-title">
                Points earned
              </span>
              <div className="dashboard__welcome-item-info dashboard__welcome-item-info--points">0</div>
            </li>
            <li className="dashboard__welcome-item">
              <span className="dashboard__welcome-item-title">Rank</span>
              <span className="dashboard__welcome-item-info dashboard__welcome-item-info--rank">0</span>
            </li>
          </ul>
        </div>
        <Rewards className="dashboard__rewards" rewards={rewards} />
        <Progress className="dashboard__progress" />
        <Leaderboard className="dashboard__leaderboard" />
      </div>
    </PageLayout>
  );
};
