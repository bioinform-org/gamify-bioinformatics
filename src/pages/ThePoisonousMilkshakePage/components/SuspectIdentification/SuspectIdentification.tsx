import { ExerciseDetails } from "../../../../components/ExerciseDetails";

export const SuspectIdentification = () => {
  return (
    <ExerciseDetails>
      <img
        loading="lazy"
        className="exercise-details__img"
        src="../../../public/images/milkshake-image.png"
        alt="exercise image"
      />
      <p className="exercise-details__text">
        The police interviewed Mirko and the people he met with in the past two
        days. They sent us a timeline of his whereabouts.
        <br />
        <br />
        Let’s figure out who might have been involved!
        <br />
        <br />
         Read the <a href="#">timeline</a> and deduce whether each person
        had a motive and a mean to poison Mirko. Use the findings from the
        previous sections to deduce whether each person had an opportunity to
        commit the crime. Note that all samples except for 5 and 10 were of dark
        hair and that all samples except for 3, 4 and 8 were of short hair.
      </p>
    </ExerciseDetails>
  );
}