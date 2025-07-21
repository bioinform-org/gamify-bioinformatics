import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Exercise } from "../../types/ProductType";
import { getExercisesFromLocal } from "../../testApi";
import { RootState } from "../store";
import { Channel } from "./channelSlice";


export interface ExercisesState {
  channels: Channel[];
  value: Exercise[] | null,
  isLoading: boolean,
  errorMessage: string,
}

const initialState: ExercisesState = {
  value: null,
  isLoading: false,
  errorMessage: '',
  channels: []
}

export const testExercisesSlice = createSlice({
  name: 'testExercises',
  initialState,
  reducers: {
    setErrorMessageForExercises: (state, action) => {
      state.errorMessage = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(testGetExercises.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(testGetExercises.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload;
      })
      .addCase(testGetExercises.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = "No exercises available at the moment. Please check back later."
      })
  }
})

export const { setErrorMessageForExercises } = testExercisesSlice.actions;
export const testSelectExercises = (state: RootState) => state.testExercises;
export default testExercisesSlice.reducer;

export const testGetExercises = createAsyncThunk(
  'exercises/testGetExercises',
  async () => await getExercisesFromLocal(),
)