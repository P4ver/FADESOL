import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';

export const fetchClientData = createAsyncThunk(
  'client/fetchClientData',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/client`, {
        withCredentials: true,
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch client data');
      }
      // console.log('FCD:res:', response.data);
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const clientSlice = createSlice({
  name: 'client',
  initialState: {
    clientData: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientData.fulfilled, (state, action) => {
        state.loading = false;
        state.clientData = action.payload;
      })
      .addCase(fetchClientData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    //   .addCase(postClientData.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(postClientData.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.clientData = [...state.clientData, action.payload];
    //   })
    //   .addCase(postClientData.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message;
    //   })
    //   .addCase(deleteClientData.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(deleteClientData.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.clientData = state.clientData.filter(client => client.id_Client !== action.payload);
    //   })
    //   .addCase(deleteClientData.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message;
    //   })
    //   .addCase(updateClientData.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(updateClientData.fulfilled, (state, action) => {
    //     state.loading = false;
    //     const { id_Client, updateClientData } = action.payload;
    //     state.clientData = state.clientData.map(client =>
    //       client.id_Client === id_Client ? updateClientData : client
    //     );
    //   })
    //   .addCase(updateClientData.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message;
    //   });
  },
});

export default clientSlice.reducer;
export const { clearError } = clientSlice.actions;
