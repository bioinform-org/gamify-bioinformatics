import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TeamType } from "../../types/TeamType";

export interface TeamsState {
  value: TeamType[];
  isLoading: boolean;
  errorMessage: string;
}

const initialState: TeamsState = {
  value: [],
  isLoading: false,
  errorMessage: "",
};

export const fetchTeams = createAsyncThunk<TeamType[]>("teams/fetchAll", async () => {
  const res = await fetch("/api/teams.json");
  if (!res.ok) throw new Error("Failed to fetch teams");
  return (await res.json()) as TeamType[];
});

export const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    addMember: (state, action: PayloadAction<{ teamId: string; userId: number }>) => {
      const team = state.value.find((t) => t.id === action.payload.teamId);
      if (!team) return;
      team.memberIds = team.memberIds ?? [];
      if (!team.memberIds.includes(action.payload.userId)) {
        team.memberIds.push(action.payload.userId);
      }
    },

    bulkAddMembers: (state, action: PayloadAction<{ teamId: string; userIds: number[] }>) => {
      const team = state.value.find((t) => t.id === action.payload.teamId);
      if (!team) return;
      team.memberIds = team.memberIds ?? [];
      action.payload.userIds.forEach((id) => {
        if (!team.memberIds!.includes(id)) team.memberIds!.push(id);
      });
    },

    removeMember: (state, action: PayloadAction<{ teamId: string; userId: number }>) => {
      const team = state.value.find((t) => t.id === action.payload.teamId);
      if (!team) return;
      team.memberIds = (team.memberIds ?? []).filter((id) => id !== action.payload.userId);
    },

    createTeam: (state, action: PayloadAction<TeamType>) => {
      const payload = action.payload;
      if (!payload.createdAt) payload.createdAt = new Date().toISOString();
      payload.memberIds = payload.memberIds ?? [];
      state.value.push(payload);
    },

    renameTeam: (state, action: PayloadAction<{ teamId: string; name: string }>) => {
      const t = state.value.find((x) => x.id === action.payload.teamId);
      if (t) t.name = action.payload.name;
    },


    deleteTeam: (state, action: PayloadAction<{ teamId: string }>) => {
      state.value = state.value.filter((t) => t.id !== action.payload.teamId);
    },

    leaveTeam: (state, action: PayloadAction<{ teamId: string; userId: number }>) => {
      const t = state.value.find((x) => x.id === action.payload.teamId);
      if (!t) return;
      t.memberIds = (t.memberIds ?? []).filter((id) => id !== action.payload.userId);
    },

    setTeams: (state, action: PayloadAction<TeamType[]>) => {
      state.value = action.payload.map((t) => ({ ...t, memberIds: t.memberIds ?? [], createdAt: t.createdAt ?? new Date().toISOString() }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload.map((t) => ({ ...t, memberIds: t.memberIds ?? [], createdAt: t.createdAt ?? new Date().toISOString() }));
      })
      .addCase(fetchTeams.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = "Teams cannot be downloaded";
      });
  },
});

export const {
  addMember,
  bulkAddMembers,
  removeMember,
  createTeam,
  renameTeam,
  deleteTeam,
  leaveTeam,
  setTeams,
} = teamsSlice.actions;

export const selectAllTeams = (state: RootState) => state.teams.value;
export const selectTeamById = (teamId: string) => (state: RootState) => state.teams.value.find((t) => t.id === teamId);
export const selectMemberIdsForTeam = (teamId: string) => (state: RootState) => state.teams.value.find((t) => t.id === teamId)?.memberIds ?? [];
export const selectTeamsOwnedByUser = (userId: number) => (state: RootState) => state.teams.value.filter((t) => t.ownerId === userId);
export const selectTeamsWhereMember = (userId: number) => (state: RootState) => state.teams.value.filter((t) => (t.memberIds ?? []).includes(userId));
export const selectTeamsCountForUser = (userId: number) => (state: RootState) =>
  state.teams.value.filter((t) => t.ownerId === userId || (t.memberIds ?? []).includes(userId)).length;

export default teamsSlice.reducer;
