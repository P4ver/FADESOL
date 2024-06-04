import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";


export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get('http://localhost:3000/user', {
          withCredentials: true,
        });
        
        if (response.status !== 200) {
          throw new Error('Failed to fetch product data');
        }
        console.log('FUD:res:', response.data);
        
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );


  export const postUserData = createAsyncThunk(
    'user/postUserData',
    async (postData, thunkAPI) => {
      try {
        const response = await axios.post('http://localhost:3000/user', postData, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        if (response.status !== 200) {
          throw new Error('Failed to post product data');
        }
        // Reset error state
        thunkAPI.dispatch(userSlice.actions.clearError());
        // Fetch product data again
        await thunkAPI.dispatch(fetchUserData());
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );


export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async ({ id_User, updateUserData }, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:3000/user/${id_User}`, updateUserData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status !== 200) {
        throw new Error('Failed to update product data');
      }
      // Fetch product data again after updating
      await thunkAPI.dispatch(fetchUserData());
      return { id_User, updateUserData };
    } catch (error) {
      throw error;
    }
  }
);



export const deleteUserData = createAsyncThunk(
  'user/deleteUserData',
  async (id_User, thunkAPI) => {
    try {
      const response = await axios.delete(`http://localhost:3000/user/${id_User}`,{
          withCredentials: true,
      });
      if (response.status !== 200) {
        throw new Error('Failed to delete product data');
      }
      // Fetch product data again after deletion
      await thunkAPI.dispatch(fetchUserData());
      return id_User; // Return the ID of the deleted product
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
      userData: [],
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
        .addCase(fetchUserData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {
          state.loading = false;
          state.userData = action.payload;
          // console.log(action.payload)
        })
        .addCase(fetchUserData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
          // console.log(action)
        })
        // Reducer for posting user data
        .addCase(postUserData.pending, (state) => {
          state.loading = true;
        })
        .addCase(postUserData.fulfilled, (state, action) => {
          state.loading = false;
          // state.userData = action.payload;
          state.userData = [...state.userData, action.payload];
        })
        .addCase(postUserData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message
        })
 
        // reducer for deleting product data
        .addCase(deleteUserData.pending, (state, action) => {
          state.loading = true;
          state.error = null
        })
        .addCase(deleteUserData.fulfilled, (state, action) => {
          state.loading = false;
          state.userData = state.userData.filter(user => user.id_User !== action.payload);
        })
        .addCase(deleteUserData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message
        })

        //reducer for update product
        .addCase(updateUserData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        // .addCase(updateUserData.fulfilled, (state, action) => {
        //   state.loading = false;
        //   const updatedData = action.payload;
        //   console.log(updatedData);
        //   state.userData = state.userData.map(user =>
        //     user.id_User === updatedData.id_User ? updatedData : user
        //   );
        // })
        .addCase(updateUserData.fulfilled, (state, action) => {
          state.loading = false;
          const { id_User, updateUserData } = action.payload;
          state.userData = state.userData.map(user =>
            user.id_User === id_User ? updateUserData : user
          );
        })
        
        
        .addCase(updateUserData.rejected, (state, action) => {
          state.loading = false;
          console.log(action)
          state.error = action.error.message;
        })
    },
  });
  
export default userSlice.reducer;