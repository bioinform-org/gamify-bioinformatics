import { configureStore } from "@reduxjs/toolkit";
//userReducer (userSlice.reducer) is a default export of userSlice file
import userReducer from '../store/features/userSlice';
import usersReducer from '../store/features/usersSlice';
import exercisesReducer from '../store/features/exercisesSlice';
import tokenReducer from '../store/features/tokenSlice';

//main state, which looks like this: state: {user, users, exercises}
//every reducer(userReducer, etc) inside reducer only responsible for their state
//BUT can be called in other state (I need to read a redux docs, but there was similar documentation);
export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    exercises: exercisesReducer,
    token: tokenReducer,
  }
})

//types for: RootState - main state, which is used in useAppSelector
//AppDispatch - I don`t think there is a need to write a lot
//AppStore - the same thought as erlier;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;