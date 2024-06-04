import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";


export const fetchProjetData = createAsyncThunk(
    'projet/fetchProjetData',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get('https://fadesol-puoc.vercel.app/projet', {
          withCredentials: true,
        });
        
        if (response.status !== 200) {
          throw new Error('Failed to fetch demande data');
        }
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

//   export const postDemandeData = createAsyncThunk(
//     'demande/postDemandeData',
//     async (postData, thunkAPI) => {
//       try {
//         const response = await axios.post('https://fadesol-puoc.vercel.app/demande', postData, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         });
//         if (response.status !== 200) {
//           throw new Error('Failed to post demande data');
//         }
//         // Reset error state
//         thunkAPI.dispatch(demandeSlice.actions.clearError());
//         // Fetch demande data again
//         await thunkAPI.dispatch(fetchProjetData());
//         return response.data;
//       } catch (error) {
//         throw error;
//       }
//     }
//   );


//   export const updateDemandeData = createAsyncThunk(
//     'demande/updateDemandeData',
//     async ({ id_Demande, updatedDemandeData }, thunkAPI) => {
//       try {
//         console.log("updatedDemandeData",updatedDemandeData)
//         const response = await axios.put(`https://fadesol-puoc.vercel.app/demande/${id_Demande}`, updatedDemandeData, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         });
//         if (response.status !== 200) {
//           throw new Error('Failed to update demande data');
//         }
//         await thunkAPI.dispatch(fetchProjetData());
//         return { id_Demande: id_Demande, updatedDemandeData: response.data };
//       } catch (error) {
//         return thunkAPI.rejectWithValue(error.message);
//       }
//     }
//   );

// export const deleteDemandeData = createAsyncThunk(
//   'demande/deleteDemandeData',
//   async (id_Demande, thunkAPI) => {
//     try {
//       const response = await axios.delete(`https://fadesol-puoc.vercel.app/demande/${id_Demande}`,{
//           withCredentials: true,
//       });
//       if (response.status !== 200) {
//         throw new Error('Failed to delete demande data');
//       }
//       // Fetch demande data again after deletion
//       await thunkAPI.dispatch(fetchProjetData());
//       return id_Demande; // Return the ID of the deleted demande
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
      error: null,//state.error
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
          // console.log(action.payload)
        })
        .addCase(fetchProjetData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
          // console.log(action)
        })
        // Reducer for posting demande data
        // .addCase(projetData.pending, (state) => {
        //   state.loading = true;
        // })
        // .addCase(projetData.fulfilled, (state, action) => {
        //   state.loading = false;
        //   // state.projetData = action.payload;
        //   state.projetData = [...state.projetData, action.payload];
        // })
        // .addCase(projetData.rejected, (state, action) => {
        //   state.loading = false;
        //   state.error = action.error.message
        // })
 
        // // reducer for deleting demande data
        // .addCase(projetData.pending, (state, action) => {
        //   state.loading = true;
        //   state.error = null
        // })
        // .addCase(projetData.fulfilled, (state, action) => {
        //   state.loading = false;
        //   state.projetData = state.projetData.filter(demande => demande.id_Demande !== action.payload);
        // })
        // .addCase(projetData.rejected, (state, action) => {
        //   state.loading = false;
        //   state.error = action.error.message
        // })

        // //reducer for update demande
        // .addCase(projetData.pending, (state) => {
        //   state.loading = true;
        //   state.error = null;
        // })
        // .addCase(projetData.fulfilled, (state, action) => {
        //   state.loading = false;
        //   const { id_Demande, projetData } = action.payload;
        //   state.projetData = state.projetData.map(demande =>
        //     demande.id_Demande === id_Demande ? projetData : demande
        //   );
        // })
        // .addCase(projetData.rejected, (state, action) => {
        //   state.loading = false;
        //   console.log(action)
        //   state.error = action.error.message;
        // })
    },
  });
  
export default projetSlice.reducer;