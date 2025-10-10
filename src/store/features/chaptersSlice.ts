import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Chapter = {
  id: number;
  name: string;
  link: string;
  completed: boolean;
  exerciseTitle: string;
  exerciseSlug: string;
};

type ChaptersState = {
  items: Chapter[];
};

const initialState: ChaptersState = {
  items: [],
};

const chaptersSlice = createSlice({
  name: "chapters",
  initialState,
  reducers: {
    setChaptersForExercise: (
      state,
      action: PayloadAction<{
        exerciseTitle: string;
        exerciseSlug: string;
        chapters: Omit<Chapter, "exerciseTitle" | "exerciseSlug">[];
      }>
    ) => {
      state.items = state.items.filter(
        (ch) => ch.exerciseSlug !== action.payload.exerciseSlug
      );
    
      const withMeta = action.payload.chapters.map((ch) => ({
        ...ch,
        exerciseTitle: action.payload.exerciseTitle,
        exerciseSlug: action.payload.exerciseSlug,
      }));
    
      state.items.push(...withMeta);
    },    

    markChapterCompleted: (
      state,
      action: PayloadAction<{ exerciseSlug: string; chapterLink: string }>
    ) => {
      const { exerciseSlug, chapterLink } = action.payload;
      const ch = state.items.find(
        (x) => x.exerciseSlug === exerciseSlug && x.link === chapterLink
      );
      if (ch) ch.completed = true;
    },
  },
});

export const { setChaptersForExercise, markChapterCompleted } = chaptersSlice.actions;
export default chaptersSlice.reducer;
