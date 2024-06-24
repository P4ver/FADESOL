import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';

export const fetchReturnData = createAsyncThunk(
  'return/fetchReturnData',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/return`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch return data');
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const postReturnData = createAsyncThunk(
  'return/postReturnData',
  async (postData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/return`, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) {
        throw new Error('Failed to post return data');
      }
      thunkAPI.dispatch(returnSlice.actions.clearError());
      await thunkAPI.dispatch(fetchReturnData());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteReturnData = createAsyncThunk(
  'return/deleteReturnData',
  async (id_Return, thunkAPI) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/return/${id_Return}`);
      if (response.status !== 200) {
        throw new Error('Failed to delete return data');
      }
      await thunkAPI.dispatch(fetchReturnData());
      return id_Return;
    } catch (error) {
      throw error;
    }
  }
);

export const updateReturnData = createAsyncThunk(
  'return/updateReturnData',
  async ({ id_Return, updatedReturnData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/return/${id_Return}`, updatedReturnData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) {
        throw new Error('Failed to update return data');
      }
      await thunkAPI.dispatch(fetchReturnData());
      return { id_Return, updatedReturnData };
    } catch (error) {
      throw error;
    }
  }
);

const returnSlice = createSlice({
  name: 'return',
  initialState: {
    returnData: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    deleteReturnItem: (state, action) => {
      state.returnData = state.returnData.filter(item => item.id_Return !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReturnData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReturnData.fulfilled, (state, action) => {
        state.loading = false;
        state.returnData = action.payload;
      })
      .addCase(fetchReturnData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postReturnData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postReturnData.fulfilled, (state, action) => {
        state.loading = false;
        state.returnData = [...state.returnData, action.payload];
      })
      .addCase(postReturnData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteReturnData.fulfilled, (state, action) => {
        state.loading = false;
        returnSlice.caseReducers.deleteReturnItem(state, action);
      })
      .addCase(deleteReturnData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateReturnData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReturnData.fulfilled, (state, action) => {
        state.loading = false;
        const { id_Return, updatedReturnData } = action.payload;
        state.returnData = state.returnData.map(returnItem =>
          returnItem.id_Return === id_Return ? { ...returnItem, ...updatedReturnData } : returnItem
        );
      })
      .addCase(updateReturnData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default returnSlice.reducer;
export const { clearError, deleteReturnItem } = returnSlice.actions;
