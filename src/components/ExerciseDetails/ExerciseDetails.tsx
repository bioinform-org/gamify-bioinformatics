import './ExerciseDetails.scss';

type Props = {
  children: React.ReactNode;
}

export const ExerciseDetails = ({ children }: Props) => {
  return (
    <div className="exercise-details">
      <h4 className="exercise-details__title">The poisonous Milkshake</h4>
      {children}
      <div className="exercise-details__buttons">
        <button className="exercise-details__button">Back</button>
        <button className="exercise-details__button">Next</button>
      </div>
    </div>
  );
}