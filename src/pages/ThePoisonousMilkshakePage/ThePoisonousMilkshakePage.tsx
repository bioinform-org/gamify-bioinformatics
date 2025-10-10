import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setChaptersForExercise } from "../../store/features/chaptersSlice";
import chaptersData from "../../../public/api/chapters.json";
import { DetailedExercisePage } from "../DetailedExercisePage";

const exerciseSlug = "the-poisonous-milkshake";
const exerciseTitle = "The poisonous Milkshake";

export const ThePoisonousMilkshakePage = () => {
  const dispatch = useAppDispatch();

  // Jeśli w store nie ma chapterów dla tego sluga, wczytujemy z JSON
  const existing = useAppSelector((s) =>
    s.chapters.items.some((c) => c.exerciseSlug === exerciseSlug)
  );

  useEffect(() => {
    if (existing) return;

    const found = (chaptersData as any[]).find(
      (e) => e.exerciseSlug === exerciseSlug || e.exerciseTitle === exerciseTitle
    );

    if (found) {
      dispatch(
        setChaptersForExercise({
          exerciseTitle: found.exerciseTitle,
          exerciseSlug: found.exerciseSlug,
          chapters: found.chapters,
        })
      );
    }
  }, [dispatch, existing]);

  // możesz też renderować "loading" zanim dane załadują się do store
  return (
    <DetailedExercisePage exerciseTitle={exerciseTitle} exerciseSlug={exerciseSlug}>
      <Outlet />
    </DetailedExercisePage>
  );
};
