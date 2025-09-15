import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Pending } from "../../types/TeamType";
import { addMember } from "./teamsSlice";

export interface PendingState {
  value: Pending[];
  isLoading: boolean;
  errorMessage: string;
}

const initialState: PendingState = {
  value: [],
  isLoading: false,
  errorMessage: "",
};

export const fetchPending = createAsyncThunk<Pending[]>("pending/fetchAll", async () => {
  const res = await fetch("/api/pending.json");
  if (!res.ok) throw new Error("Failed to fetch pending");
  return (await res.json()) as Pending[];
});

export const acceptPendingAndAddMember = createAsyncThunk<void, { id: string }, { state: RootState }>(
  "pending/acceptAndAdd",
  async ({ id }, { dispatch, getState }) => {
    const state = getState();
    const pending = state.pending.value.find((p) => p.id === id);
    if (!pending) {
      console.warn(`acceptPendingAndAddMember: pending ${id} not found`);
      return;
    }

    const teamId = (pending).teamId ?? (pending).teamId;
    if (!teamId) {
      console.warn(`acceptPendingAndAddMember: teamId not found for pending ${id}`);
      dispatch(acceptPending({ id }));
      return;
    }

    const HARDCODED_USER_ID = 1;

    dispatch(addMember({ teamId, userId: HARDCODED_USER_ID }));

    dispatch(acceptPending({ id }));
  }
);

export const pendingSlice = createSlice({
  name: "pending",
  initialState,
  reducers: {
    acceptPending: (state, action: PayloadAction<{ id: string }>) => {
      state.value = state.value.filter((p) => p.id !== action.payload.id);
    },
    rejectPending: (state, action: PayloadAction<{ id: string }>) => {
      state.value = state.value.filter((p) => p.id !== action.payload.id);
    },
    addPending: (state, action: PayloadAction<Pending>) => {
      if (!state.value.some((p) => p.id === action.payload.id)) {
        state.value.push(action.payload);
      }
    },

    setPending: (state, action: PayloadAction<Pending[]>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPending.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(fetchPending.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload;
      })
      .addCase(fetchPending.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = "Pending cannot be downloaded";
      });
  },
});

export const { acceptPending, rejectPending, addPending, setPending } = pendingSlice.actions;

export const selectPendingForUser = (state: RootState) => {
  const all = state.pending.value ?? [];
  return all.filter((p) => p.status === "pending");
};

export const selectPendingCountForUser = (state: RootState) => selectPendingForUser(state).length;

export default pendingSlice.reducer;
