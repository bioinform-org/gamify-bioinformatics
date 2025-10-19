import { useSelector } from 'react-redux';
import './InfoBlock.scss';
import { RootState } from '../../store/store';
import { useParams } from 'react-router-dom';

export const InfoBlock = () => {
  const { exerciseSlug } = useParams<{ exerciseSlug: string }>();

  const chapters = useSelector(
    (state: RootState) =>
      state.chapters.items.filter(
        (ch) => ch.exerciseSlug === exerciseSlug
      )
  );

  const completedCount = chapters.filter((ch) => ch.completed).length;
  const totalCount = chapters.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;


  return (
    <div className="info-block">
      <div className="info-block__text-container">
        <p className="info-block__text">Topic:</p>
        <p className="info-block__text--bold">Molecular biology</p>
      </div>

      <div className="info-block__text-container">
        <p className="info-block__text">Estimated time:</p>
        <p className="info-block__text--bold">1 hour</p>
      </div>

      <p className="info-block__progress-bar-text">Exercise progress</p>
      <div className="info-block__progress-bar">
        <div className="info-block__progress-bar-line">
          <div
            className="info-block__progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="info-block__progress-bar-label">{progress}%</span>
      </div>
    </div>
  );
};