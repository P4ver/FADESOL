import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';

export const fetchProjetData = createAsyncThunk(
  'projet/fetchProjetData',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projet`, {
        withCredentials: true,
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch project data');
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Uncomment and update these Thunks as needed
// export const postProjetData = createAsyncThunk(
//   'projet/postProjetData',
//   async (postData, thunkAPI) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/projet`, postData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         withCredentials: true,
//       });
//       if (response.status !== 200) {
//         throw new Error('Failed to post project data');
//       }
//       // Reset error state
//       thunkAPI.dispatch(projetSlice.actions.clearError());
//       // Fetch project data again
//       await thunkAPI.dispatch(fetchProjetData());
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// export const updateProjetData = createAsyncThunk(
//   'projet/updateProjetData',
//   async ({ projectId, updatedProjetData }, thunkAPI) => {
//     try {
//       const response = await axios.put(`${API_BASE_URL}/projet/${projectId}`, updatedProjetData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         withCredentials: true,
//       });
//       if (response.status !== 200) {
//         throw new Error('Failed to update project data');
//       }
//       await thunkAPI.dispatch(fetchProjetData());
//       return { idProject: projectId, updatedProjetData: response.data };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteProjetData = createAsyncThunk(
//   'projet/deleteProjetData',
//   async (projectId, thunkAPI) => {
//     try {
//       const response = await axios.delete(`${API_BASE_URL}/projet/${projectId}`, {
//         withCredentials: true,
//       });
//       if (response.status !== 200) {
//         throw new Error('Failed to delete project data');
//       }
//       // Fetch project data again after deletion
//       await thunkAPI.dispatch(fetchProjetData());
//       return projectId; // Return the ID of the deleted project
//     } catch (error) {
//       throw error;
//     }
//   }
// );

const projetSlice = createSlice({
  name: 'projet',
  initialState: {
    projetData: [],
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
      .addCase(fetchProjetData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjetData.fulfilled, (state, action) => {
        state.loading = false;
        state.projetData = action.payload;
      })
      .addCase(fetchProjetData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    // Uncomment and update these cases as needed
    // .addCase(postProjetData.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(postProjetData.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.projetData = [...state.projetData, action.payload];
    // })
    // .addCase(postProjetData.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // })
    // .addCase(deleteProjetData.pending, (state, action) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(deleteProjetData.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.projetData = state.projetData.filter(project => project.idProject !== action.payload);
    // })
    // .addCase(deleteProjetData.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // })
    // .addCase(updateProjetData.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(updateProjetData.fulfilled, (state, action) => {
    //   state.loading = false;
    //   const { idProject, updatedProjetData } = action.payload;
    //   state.projetData = state.projetData.map(project =>
    //     project.idProject === idProject ? updatedProjetData : project
    //   );
    // })
    // .addCase(updateProjetData.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // });
  },
});

export default projetSlice.reducer;
export const { clearError } = projetSlice.actions;
