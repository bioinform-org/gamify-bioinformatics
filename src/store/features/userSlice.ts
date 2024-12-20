import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/ProductType";
import { RootState } from "../store";
import { loginUser } from "../../api";

//ALL INFORMATION HERE IS ALMOST INDENTICAL TO EXERCISEsSLICE
//but You can notice that there are 6 addCases (for 3 to every function working with api: currently only getUser and createUser)
//There is also setUser function, which kinda helps in logging out just by setting user to null, which triggers AuthComponent (I guess)
export interface userState {
  value: User | null,
  isLoading: boolean,
  errorMessage: string,
}

type createAndGetUserProps = { email: string, password: string}

const initialState: userState = {
  value: null,
  isLoading: false,
  errorMessage: '',
}

//for api request we have to use async thunks

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // getUser: (state, action: PayloadAction<null | User>) => {
    //   state.value = action.payload;
    // },

    // //temporary this function will set a new user, while database and server are in development
    // //later it should send post request to create a new user
    // createUser: (state, action: PayloadAction<User>) => {
    //   state.value = action.payload;
    // },

    //DONT TO USE CURRENTLY
    //this function will be used to delete user from database using delete request
    // deleteUser: (state, action: PayloadAction<User>) => {
    //   state.value = action.payload;
    // },


    //DONT TO USE CURRENTLY
    //this function will be used to update user info using update request
    // updateUser: (state, action: PayloadAction<User>) => {
    //   state.value = action.payload;
    // },
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(getUser.pending, (state) => {
  //       state.isLoading = true;
  //       state.errorMessage = '';
  //     })
  //     .addCase(getUser.fulfilled, (state, action) => {
  //       state.isLoading = false;
  
  //       //here is an additional line of code to check if user received by email has the same password as was inputed on the page during login
  //       if (action.payload.user.password === action.payload.password) {
  //         state.value = action.payload.user;
  //       }
  //     })
  //     .addCase(getUser.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.errorMessage = action.error
  //     })
  //     .addCase(createUser.pending, (state) => {
  //       state.isLoading = true;
  //       state.errorMessage = '';
  //     })
  //     .addCase(createUser.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.value = action.payload;
  //     })
  //     .addCase(createUser.rejected, (state) => {
  //       state.isLoading = false;
  //       state.errorMessage = 'We are sorry, but we can`t add new user. Please try again later, or check out your information'
  //     })
  // },
})

// export const { getUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer;

// export const getUser = createAsyncThunk(
//   'user/getUser',
//   async (email: string, password: string) => await loginUser(email, password)
// );

// export const createUser = createAsyncThunk(
//   'user/createUser',
//   async ({ email, password}: createAndGetUserProps) => await createNewUser(email, password)
// );

//in development
// export const updateUser = createAsyncThunk(
//   'user/updateUser',
//   async (email: string) => await updateUser(email)
// );

// export const deleteUser = createAsyncThunk(
//   'user/deleteUser',
//   async (email: string) => await deleteUser(email)
// );
