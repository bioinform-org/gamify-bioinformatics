import { ExerciseDetails } from "../../../../components/ExerciseDetails"

export const ProteinIdentification = () => {

  return (
    <ExerciseDetails>
      <img
        loading="lazy"
        className="exercise-details__img"
        src="../../../public/images/milkshake-image.png"
        alt="exercise image"
      />
      <p className="exercise-details__text">
        The laboratory technician called to give us an update. They were able to
        sequence a total of 10 different proteins from the samples taken from
        Mirko’s cup.
        <br />
        <br />
        Let’s try to identify the extracted proteins!
        <br />
        <br /> Go to <a href="#">UniProt</a> and open the BLAST tool. For each
        entry in the <a href="#">milkshake_samples.fasta </a>file, try to
        collect the following information:
      </p>
      <ul className="exercise-details__text" style={{ paddingLeft: 20 }}>
        <li>UniProt ID</li>
        <li>Protein name</li>
        <li>Function</li>
        <li>Subcellular location</li>
      </ul>
      <p className="exercise-details__text">
        Finally, let’s identify the cause of Mirko’s condition and try to list
        the most probable ingredients he used to make the milkshake.
      </p>
    </ExerciseDetails>
  );
}