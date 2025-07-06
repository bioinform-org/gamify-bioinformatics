import { ExerciseDetails } from "../../../../components/ExerciseDetails";


export const Introduction = () => {
  return (
      <ExerciseDetails>
        <img
          className="exercise-details__img"
          src="../../../public/images/milkshake-image.png"
          alt="exercise image"
        />
        <p className="exercise-details__text">
          Mirko Petrović was admitted to the hospital this morning, with muscle
          weakness and double vision. His condition rapidly worsened after
          admission, perplexing the attending physicians. Initial suspicions
          point toward potential intoxication, yet the specific toxin
          responsible for his symptoms remains unknown.
          <br />
          <br /> Amidst the medical urgency, law enforcement has raised concerns
          about possible foul play. In a proactive move, the police gathered
          several hairs from Mirko’s residence, dispatching them for analysis.
          <br />
          <br /> Since the forensic bioinformatician is currently on sick leave
          we were asked to help with the analysis. Mirko mentioned having
          prepared a milkshake the previous evening. A laboratory technician was
          dispatched to procure some samples of the residual substance for
          analysis.
        </p>
      </ExerciseDetails>
  );
}