import './ExerciseDetails.scss';

export const ExerciseDetails = () => {
  return (
    <div className="exercise-details">
      <h4 className="exercise-details__title">The poisonous Milkshake</h4>
      <img
        className="exercise-details__img"
        src="../../../public/images/milkshake-image.png"
        alt="exercise image"
      />
      <p className="exercise-details__text">
        Mirko Petrović was admitted to the hospital this morning, with muscle
        weakness and double vision. His condition rapidly worsened after
        admission, perplexing the attending physicians. Initial suspicions point
        toward potential intoxication, yet the specific toxin responsible for
        his symptoms remains unknown.
        <br />
        <br /> Amidst the medical urgency, law enforcement has raised concerns
        about possible foul play. In a proactive move, the police gathered
        several hairs from Mirko’s residence, dispatching them for analysis.
        <br />
        <br /> Since the forensic bioinformatician is currently on sick leave we
        were asked to help with the analysis. Mirko mentioned having prepared a
        milkshake the previous evening. A laboratory technician was dispatched
        to procure some samples of the residual substance for analysis.
      </p>
      <div className="exercise-details__buttons">
        <button className="exercise-details__button">Back</button>
        <button className="exercise-details__button">Next</button>
      </div>
    </div>
  );
}