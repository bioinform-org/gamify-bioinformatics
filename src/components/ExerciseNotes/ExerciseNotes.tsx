import './ExerciseNotes.scss';

export const ExerciseNotes = () => {
  return (
    <div className="notes">
      <p className="notes__text">For your notes</p>
      <div className='notes__container'>
        <textarea
          className="notes__textarea"
          autoCorrect='on'
          rows={15}
          cols={33}
          placeholder="Write your notes here while you work on the task"
          name="textarea"
          id="textarea"
        />
      </div>
    </div>
  );
}