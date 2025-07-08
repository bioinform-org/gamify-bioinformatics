import { Link, useLocation } from 'react-router-dom';
import './ExerciseDetails.scss';

const chapters = [
  {
    id: 1,
    name: "Introduction",
    link: "introduction",
    completed: false,
  },
  {
    id: 2,
    name: "Species identification",
    link: "species-identification",
    completed: false,
  },
  {
    id: 3,
    name: "Protein identification",
    link: "protein-identification",
    completed: false,
  },
  {
    id: 4,
    name: "Suspect identification",
    link: "suspect-identification",
    completed: false,
  },
];

type Props = {
  children: React.ReactNode;
};

export const ExerciseDetails = ({ children }: Props) => {

  const { pathname } = useLocation();
  const index = chapters.findIndex(chapter => pathname === `/the-poisonous-milkshake/${chapter.link}`)
  const nextPage = chapters && index === chapters.length - 1 ? 'answer' : chapters[index + 1].link;
  const previousPage = chapters && index === 0 ? chapters[0].link : chapters[index-1].link;

  return (
    <div className="exercise-details">
      <h4 className="exercise-details__title">The poisonous Milkshake</h4>
      {children}
      <div className="exercise-details__buttons">
        <Link
          to={`/the-poisonous-milkshake/${previousPage}`}
          className="exercise-details__button"
        >
          Back
        </Link>
        <Link
          to={`/the-poisonous-milkshake/${nextPage}`}
          className="exercise-details__button"
        >
          Next
        </Link>
      </div>
    </div>
  );
}