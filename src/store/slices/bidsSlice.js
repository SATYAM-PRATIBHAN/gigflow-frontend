import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Async thunks
export const createBid = createAsyncThunk(
  "bids/createBid",
  async (bidData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/bids", bidData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create bid"
      );
    }
  }
);

export const fetchBidsByGig = createAsyncThunk(
  "bids/fetchBidsByGig",
  async (gigId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/bids/gig/${gigId}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch bids"
      );
    }
  }
);

export const fetchMyBids = createAsyncThunk(
  "bids/fetchMyBids",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/bids/my/bids");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch your bids"
      );
    }
  }
);

export const hireBid = createAsyncThunk(
  "bids/hireBid",
  async (bidId, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/bids/${bidId}/hire`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to hire freelancer"
      );
    }
  }
);

const bidsSlice = createSlice({
  name: "bids",
  initialState: {
    bids: [],
    myBids: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateBidStatus: (state, action) => {
      const { bidId, status } = action.payload;
      const bid = state.myBids.find((b) => b._id === bidId);
      if (bid) {
        bid.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Bid
      .addCase(createBid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBid.fulfilled, (state, action) => {
        state.loading = false;
        state.bids.unshift(action.payload.data);
      })
      .addCase(createBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Bids By Gig
      .addCase(fetchBidsByGig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBidsByGig.fulfilled, (state, action) => {
        state.loading = false;
        state.bids = action.payload.data;
      })
      .addCase(fetchBidsByGig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch My Bids
      .addCase(fetchMyBids.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBids.fulfilled, (state, action) => {
        state.loading = false;
        state.myBids = action.payload.data;
      })
      .addCase(fetchMyBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Hire Bid
      .addCase(hireBid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(hireBid.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bids.findIndex(
          (bid) => bid._id === action.payload.data._id
        );
        if (index !== -1) {
          state.bids[index] = action.payload.data;
        }
      })
      .addCase(hireBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, updateBidStatus } = bidsSlice.actions;
export default bidsSlice.reducer;
