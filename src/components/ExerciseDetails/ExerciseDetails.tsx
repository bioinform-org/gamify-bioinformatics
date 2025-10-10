import { Link, useLocation, useNavigate } from "react-router-dom";
import "./ExerciseDetails.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { markChapterCompleted } from "../../store/features/chaptersSlice";

type Props = {
  children: React.ReactNode;
};

export const ExerciseDetails = ({ children }: Props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Wyznacz slug bazując na pathname; obsłużamy oba warianty:
  // /the-poisonous-milkshake/... i /exercises/the-poisonous-milkshake/...
  const segments = pathname.split("/").filter(Boolean);
  const baseIsExercises = segments[0] === "exercises";
  const exerciseSlug = baseIsExercises ? segments[1] : segments[0];
  const currentChapterLink = segments[segments.length - 1] || "";

  // pobierz chaptery dla tego sluga
  const chapters = useAppSelector((s) =>
    s.chapters.items.filter((ch) => ch.exerciseSlug === exerciseSlug)
  );

  const index = chapters.findIndex((ch) => ch.link === currentChapterLink);

  // Bezpieczne obliczenia next/previous
  const safeIndex = index === -1 ? 0 : index;
  const isLast = chapters.length > 0 && safeIndex === chapters.length - 1;
  const nextPage = isLast ? "answer" : chapters[safeIndex + 1]?.link;
  const previousPage =
    safeIndex <= 0 ? chapters[0]?.link : chapters[safeIndex - 1]?.link;

  const prefix = baseIsExercises ? "/exercises" : ""; // zachowujemy strukturę ścieżek

  const handleNextClick = () => {
    // oznacz jako completed jeśli znaleziono
    if (index >= 0 && chapters[index]) {
      dispatch(
        markChapterCompleted({
          exerciseSlug,
          chapterLink: chapters[index].link,
        })
      );
    }

    // nawiguj
    if (!nextPage) return;
    navigate(`${prefix}/${exerciseSlug}/${nextPage}`);
  };

  return (
    <div className="exercise-details">
      <h4 className="exercise-details__title">
        {exerciseSlug.replace(/-/g, " ")}
      </h4>
      {children}
      <div className="exercise-details__buttons">
        <Link
          to={`${prefix}/${exerciseSlug}/${previousPage}`}
          className="exercise-details__button"
        >
          Back
        </Link>
        <button
          onClick={handleNextClick}
          className="exercise-details__button"
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};
