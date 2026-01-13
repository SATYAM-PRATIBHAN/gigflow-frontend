import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Async thunks
export const fetchGigs = createAsyncThunk(
  "gigs/fetchGigs",
  async ({ search = "", status = "open" } = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/gigs", {
        params: { search, status },
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch gigs"
      );
    }
  }
);

export const fetchGigById = createAsyncThunk(
  "gigs/fetchGigById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/gigs/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch gig"
      );
    }
  }
);

export const createGig = createAsyncThunk(
  "gigs/createGig",
  async (gigData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/gigs", gigData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create gig"
      );
    }
  }
);

export const updateGig = createAsyncThunk(
  "gigs/updateGig",
  async ({ id, gigData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/gigs/${id}`, gigData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update gig"
      );
    }
  }
);

export const deleteGig = createAsyncThunk(
  "gigs/deleteGig",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/gigs/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete gig"
      );
    }
  }
);

export const fetchMyGigs = createAsyncThunk(
  "gigs/fetchMyGigs",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/gigs/my/gigs");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch your gigs"
      );
    }
  }
);

const gigsSlice = createSlice({
  name: "gigs",
  initialState: {
    gigs: [],
    myGigs: [],
    currentGig: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentGig: (state) => {
      state.currentGig = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Gigs
      .addCase(fetchGigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.gigs = action.payload.data;
      })
      .addCase(fetchGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Gig By ID
      .addCase(fetchGigById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGigById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGig = action.payload.data;
      })
      .addCase(fetchGigById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Gig
      .addCase(createGig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGig.fulfilled, (state, action) => {
        state.loading = false;
        state.gigs.unshift(action.payload.data);
      })
      .addCase(createGig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Gig
      .addCase(updateGig.fulfilled, (state, action) => {
        const index = state.gigs.findIndex(
          (gig) => gig._id === action.payload.data._id
        );
        if (index !== -1) {
          state.gigs[index] = action.payload.data;
        }
        if (state.currentGig?._id === action.payload.data._id) {
          state.currentGig = action.payload.data;
        }
      })
      // Delete Gig
      .addCase(deleteGig.fulfilled, (state, action) => {
        state.gigs = state.gigs.filter((gig) => gig._id !== action.payload);
      })
      // Fetch My Gigs
      .addCase(fetchMyGigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.myGigs = action.payload.data;
      })
      .addCase(fetchMyGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentGig } = gigsSlice.actions;
export default gigsSlice.reducer;
