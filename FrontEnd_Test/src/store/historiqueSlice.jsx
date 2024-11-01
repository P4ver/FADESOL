import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';

// Action asynchrone pour récupérer les données de vente
export const fetchHistoriqueData = createAsyncThunk(
  'vente/fetchHistoriqueData',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/historique`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch historique data');
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);



// Action asynchrone pour poster de nouvelles données de vente
export const postHistoriqueData = createAsyncThunk(
  'vente/postHistoriqueData',
  async (postData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/historique`, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) {
        throw new Error('Failed to post historique data');
      }
      // Réinitialisation de l'état d'erreur
      thunkAPI.dispatch(historiqueSlice.actions.clearError());
      // Recharger les données de vente après l'ajout
      await thunkAPI.dispatch(fetchHistoriqueData());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Action asynchrone pour supprimer des données de vente
export const deleteHistoriqueData = createAsyncThunk(
  'vente/deleteHistoriqueData',
  async (id_Historique, thunkAPI) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/historique/${id_Historique}`);
      if (response.status !== 200) {
        throw new Error('Failed to delete historique data');
      }
      // Recharger les données de vente après la suppression
      await thunkAPI.dispatch(fetchHistoriqueData());
      return id_Historique;
    } catch (error) {
      throw error;
    }
  }
);

// Action asynchrone pour mettre à jour des données de vente
export const updateHistoriqueData = createAsyncThunk(
  'vente/updateHistoriqueData',
  async ({ id_Historique, historiqueData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/historique/${id_Historique}`, historiqueData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) {
        throw new Error('Failed to update historique data');
      }
      // Recharger les données de vente après la mise à jour
      await thunkAPI.dispatch(fetchHistoriqueData());
      return { id_Historique, historiqueData };
    } catch (error) {
      throw error;
    }
  }
);

// Slice pour gérer l'état des ventes
const historiqueSlice = createSlice({
  name: 'historique',
  initialState: {
    historiqueData: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    deleteHistoriqueItem: (state, action) => {
      state.historiqueData = state.historiqueData.filter(item => item.id_Historique !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoriqueData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistoriqueData.fulfilled, (state, action) => {
        state.loading = false;
        state.historiqueData = action.payload;
      })
      .addCase(fetchHistoriqueData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postHistoriqueData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postHistoriqueData.fulfilled, (state, action) => {
        state.loading = false;
        state.historiqueData = [...state.historiqueData, action.payload];
      })
      .addCase(postHistoriqueData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteHistoriqueData.fulfilled, (state, action) => {
        state.loading = false;
        state.historiqueData = state.historiqueData.filter(item => item.id_Historique !== action.payload);
      })
      .addCase(deleteHistoriqueData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateHistoriqueData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHistoriqueData.fulfilled, (state, action) => {
        state.loading = false;
        // Mettre à jour les données de vente si nécessaire
        const updatedData = action.payload.historiqueData;
        state.historiqueData = state.historiqueData.map(item =>
          item.id_Historique === action.payload.id_Historique ? { ...item, ...updatedData } : item
        );
      })
      .addCase(updateHistoriqueData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearError, deleteHistoriqueItem } = historiqueSlice.actions;
export default historiqueSlice.reducer;
