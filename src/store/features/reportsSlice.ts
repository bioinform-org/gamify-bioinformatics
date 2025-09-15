import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Report {
  id: number;
  reason: string;
  userName: string;
  chatName: string;
  date: string;
}

interface ReportsState {
  value: Report[];
  isLoading: boolean;
  errorMessage: string;
}

const initialState: ReportsState = {
  value: [],
  isLoading: false,
  errorMessage: "",
};

export const fetchReports = createAsyncThunk<Report[]>(
  "reports/fetchAll",
  async () => {
    const res = await fetch("/api/reports.json");
    if (!res.ok) throw new Error("Failed to fetch reports");
    return (await res.json()) as Report[];
  }
);

export const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    addReport: (state, action: PayloadAction<Omit<Report, "id" | "date">>) => {
      const newReport: Report = {
        ...action.payload,
        id: Date.now(),
        date: new Date().toISOString(),
      };
      state.value.push(newReport);
    },
    deleteReport: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((r) => r.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload;
      })
      .addCase(fetchReports.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = "Reports cannot be downloaded from the server";
      });
  },
});

export const { addReport, deleteReport } = reportsSlice.actions;
export const selectReports = (state: RootState) => state.reports;
export default reportsSlice.reducer;
