import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Exercise } from "../../types/ProductType";
import { getExercisesFromServer } from "../../api";
import { RootState } from "../store";

//this is an exercise slice (means slice of state), where we store exercises and manage it's fetching from the server with additional side 
//effects, such as changing isLoading value when a request is in process (pending) and after finishing it (fulfilled or rejected)
//and adding errorMessage

//typization for initial state
export interface ExercisesState {
  value: Exercise[] | null,
  isLoading: boolean,
  errorMessage: string,
}

//initial state with default values
const initialState: ExercisesState = {
  value: null, 
  isLoading: false,
  errorMessage: '',
}

//Slice with a name (used as a part type in reducers (which not only are function, but actually actions and action cretors))
//initial state and reducers - sync update logic (maybe?)
//extraReducers - which can help in creating side effects (can be used with async Thunks (There are also sync thunks, but You can check them out in redux documentaion));
export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    setErrorMessageForMessages: (state, action) => {
      state.errorMessage = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getExercises.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(getExercises.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload;
      })
      .addCase(getExercises.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = "No exercises available at the moment. Please check back later."
      })
  }
})

//exporting actions and action creators (they are one thing together)
export const { setErrorMessageForMessages } = exercisesSlice.actions;

//exporting selectors - function to simplify what state we want to get
//they can be ignored or not created, but they are usefull in DRY
//for example instead of writing: 
//const exercises = useAppSelector((state: RootState) => state.exercises)
//we will just write:
//const exercises = useAppSelector(selectExercises),
//which will minimise typo mistakes
export const selectExercises = (state: RootState) => state.exercises;

//we are exporting out main reducer to store: under the hood it is basically switch() or if else with actions and approriate function-reducers
//written higher (maybe? - check out documentation)
export default exercisesSlice.reducer;

//this is an async thunk, which has as a first argument part of action.type, 
//yes, A PART, then it will add promise status. For example:
//exercises/getExercises/(pending/fulfilled/rejected) and approriate action payload
//to work with those action we use extraReduces with builder and it's build-in function addCases
//there are also defaultCase and CaseMatchers, but I haven`t read about them yet
export const getExercises = createAsyncThunk(
  'exercises/getExercises',
  async () => await getExercisesFromServer(),
)