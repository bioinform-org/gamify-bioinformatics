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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quos
        assumenda vel aperiam consequatur magni provident, aut incidunt. Odit id
        fugit porro voluptate distinctio quibusdam animi recusandae quod
        deserunt laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Eos quos assumenda vel aperiam consequatur magni provident, aut
        incidunt. Odit id fugit porro voluptate distinctio quibusdam animi
        recusandae quod deserunt laboriosam. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Eos quos assumenda vel aperiam consequatur
        magni provident, aut incidunt. Odit id fugit porro voluptate distinctio
        quibusdam animi recusandae quod deserunt laboriosam. Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Eos quos assumenda vel aperiam
        consequatur magni provident, aut incidunt. Odit id fugit porro voluptate
        distinctio quibusdam animi recusandae quod deserunt laboriosam.
      </p>
      <div className="exercise-details__buttons">
        <button className="exercise-details__button">Back</button>
        <button className="exercise-details__button">Next</button>
      </div>
    </div>
  );
}