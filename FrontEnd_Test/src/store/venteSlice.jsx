//-----------
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';

// Action asynchrone pour récupérer les données de vente
export const fetchVenteData = createAsyncThunk(
  'vente/fetchVenteData',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vente`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch vente data');
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Action asynchrone pour récupérer les données de vente par jour
export const fetchVenteByDayData = createAsyncThunk(
  'vente/fetchVenteByDayData',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vente/byDay`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch daily vente data');
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Action asynchrone pour poster de nouvelles données de vente
export const postVenteData = createAsyncThunk(
  'vente/postVenteData',
  async (postData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/vente`, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) {
        throw new Error('Failed to post vente data');
      }
      // Réinitialisation de l'état d'erreur
      thunkAPI.dispatch(venteSlice.actions.clearError());
      // Recharger les données de vente après l'ajout
      await thunkAPI.dispatch(fetchVenteData());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Action asynchrone pour supprimer des données de vente
export const deleteVenteData = createAsyncThunk(
  'vente/deleteVenteData',
  async (id_Vente, thunkAPI) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/vente/${id_Vente}`);
      if (response.status !== 200) {
        throw new Error('Failed to delete vente data');
      }
      // Recharger les données de vente après la suppression
      await thunkAPI.dispatch(fetchVenteData());
      return id_Vente;
    } catch (error) {
      throw error;
    }
  }
);

// Action asynchrone pour mettre à jour des données de vente
export const updateVenteData = createAsyncThunk(
  'vente/updateVenteData',
  async ({ id_Vente, updatedVenteData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/vente/${id_Vente}`, updatedVenteData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) {
        throw new Error('Failed to update vente data');
      }
      // Recharger les données de vente après la mise à jour
      await thunkAPI.dispatch(fetchVenteData());
      return { id_Vente, updatedVenteData };
    } catch (error) {
      throw error;
    }
  }
);

// Slice pour gérer l'état des ventes
const venteSlice = createSlice({
  name: 'vente',
  initialState: {
    venteData: [],
    venteByDayData: [], // Nouvel état pour les ventes par jour
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    deleteVenteItem: (state, action) => {
      state.venteData = state.venteData.filter(item => item.id_Vente !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVenteData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVenteData.fulfilled, (state, action) => {
        state.loading = false;
        state.venteData = action.payload;
      })
      .addCase(fetchVenteData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchVenteByDayData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVenteByDayData.fulfilled, (state, action) => {
        state.loading = false;
        state.venteByDayData = action.payload;
      })
      .addCase(fetchVenteByDayData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postVenteData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postVenteData.fulfilled, (state, action) => {
        state.loading = false;
        state.venteData = [...state.venteData, action.payload];
      })
      .addCase(postVenteData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteVenteData.fulfilled, (state, action) => {
        state.loading = false;
        state.venteData = state.venteData.filter(item => item.id_Vente !== action.payload);
      })
      .addCase(deleteVenteData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateVenteData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVenteData.fulfilled, (state, action) => {
        state.loading = false;
        // Mettre à jour les données de vente si nécessaire
        const updatedData = action.payload.updatedVenteData;
        state.venteData = state.venteData.map(item =>
          item.id_Vente === action.payload.id_Vente ? { ...item, ...updatedData } : item
        );
      })
      .addCase(updateVenteData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearError, deleteVenteItem } = venteSlice.actions;
export default venteSlice.reducer;
