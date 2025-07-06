import './Answer.scss';

const suspects = [
  "Ms Maša Ratković",
  "Mr Veljko Petijević",
  "Dr Zorana Marjanović",
  "Mr Neven Milojević",
  "Mr Miloš Perović",
  "Mr Nikola Stanković",
  "Mrs Bojana Živković",
  "Mr Aleksandar Stojanović",
  "Ms Marija Andrić",
  "Mr Đurađ Marić",
];

export const Answer = () => {
  return (
    <fieldset className="answer">
      <h3 className="answer__title">Select the suspect</h3>
      <span className="answer__text">Atempts available: 3</span>
      {suspects.map((suspect, index) => {
        return (
          <div className="answer__checkbox">
            <input
              className="answer__input"
              type="checkbox"
              name={suspect}
              id={index.toString()}
            />
            <label className="answer__label" htmlFor={index.toString()}>
              {suspect}
            </label>
          </div>
        );
      })}
      <button className="answer__button" type="submit">
        Submit
      </button>
    </fieldset>
  );
}