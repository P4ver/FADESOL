import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';

// Fetch all transaction data
export const fetchTransactionData = createAsyncThunk(
  'transaction/fetchTransactionData',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/transactions`, {
        withCredentials: true,
      });
      if (response.status !== 200) {
        throw new Error('Failed to fetch transaction data');
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Fetch transaction data by ID
export const fetchTransactionById = createAsyncThunk(
  'transaction/fetchTransactionById',
  async (transactionId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/transactions/${transactionId}`, {
        withCredentials: true,
      });
      if (response.status !== 200) {
        throw new Error('Failed to fetch transaction by ID');
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Post new transaction data
export const postTransactionData = createAsyncThunk(
  'transaction/postTransactionData',
  async (postData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/transactions`, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status !== 200) {
        throw new Error('Failed to post transaction data');
      }
      // Clear any previous error state
      thunkAPI.dispatch(transactionSlice.actions.clearError());
      // Fetch transaction data again
      await thunkAPI.dispatch(fetchTransactionData());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);


// Create transactionSlice
const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    transactionData: [],
    loading: false,
    error: null, // Error state
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch transaction data
      .addCase(fetchTransactionData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionData.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionData = action.payload;
      })
      .addCase(fetchTransactionData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch transaction by ID
      .addCase(fetchTransactionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionById.fulfilled, (state, action) => {
        state.loading = false;
        const transaction = action.payload;
        state.transactionData = state.transactionData.map(t =>
          t.idTransaction === transaction.idTransaction ? transaction : t
        );
      })
      .addCase(fetchTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Post transaction data
      .addCase(postTransactionData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postTransactionData.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionData = [...state.transactionData, action.payload];
      })
      .addCase(postTransactionData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default transactionSlice.reducer;
export const { clearError } = transactionSlice.actions;
