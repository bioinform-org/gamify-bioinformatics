import { ExerciseDetails } from "../../../components/ExerciseDetails"

export const SpeciesIdentification = () => {
  return (
    <ExerciseDetails>
      <img
        className="exercise-details__img"
        src="../../../public/images/milkshake-image.png"
        alt="exercise image"
      />
      <p className="exercise-details__text">
        The police collected several hairs from Mirko’s apartment last night.
        Their scientific laboratory managed to extract the DNA and to sequence
        the <a href="#">cytochrome c oxidase subunit 1 (COI or COX1) gene</a>{" "}
        from each sample. They sent us 10 different DNA sequences.
        <br />
        <br />
        Let’s discover what species each sequence belongs to!
        <br />
        <br />
        Open <a href="#">BOLD systems</a>, select the option "Species Level
        Barcode Records" and paste one FASTA sequence from the
        <a href="#">hair_samples.fasta</a> file. Visualize the results and take
        note of the species found. The phylogenetic tree can also be visualized
        and interpreted (optional). Iterate the process until each sequence is
        associated with the corresponding species.
      </p>
    </ExerciseDetails>
  );
}