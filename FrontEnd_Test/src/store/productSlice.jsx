import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";


export const fetchProductData = createAsyncThunk(
    'product/fetchProductData',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get('http://localhost:3000/produits', {
          withCredentials: true,
        });
        
        if (response.status !== 200) {
          throw new Error('Failed to fetch product data');
        }
        console.log('FPD:res:', response.data);
        
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );


  export const postProductData = createAsyncThunk(
    'product/postProductData',
    async (postData, thunkAPI) => {
      try {
        const response = await axios.post('http://localhost:3000/produits', postData, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        if (response.status !== 200) {
          throw new Error('Failed to post product data');
        }
        // Reset error state
        thunkAPI.dispatch(productSlice.actions.clearError());
        // Fetch product data again
        await thunkAPI.dispatch(fetchProductData());
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );


export const updateProductData = createAsyncThunk(
  'product/updateProductData',
  async ({ productId, updatedProductData }, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:3000/produits/${productId}`, updatedProductData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status !== 200) {
        throw new Error('Failed to update product data');
      }
      // Fetch product data again after updating
      await thunkAPI.dispatch(fetchProductData());
      return { productId, updatedProductData };
    } catch (error) {
      throw error;
    }
  }
);

export const deleteProductData = createAsyncThunk(
  'product/deleteProductData',
  async (productId, thunkAPI) => {
    try {
      const response = await axios.delete(`http://localhost:3000/produits/${productId}`,{
          withCredentials: true,
      });
      if (response.status !== 200) {
        throw new Error('Failed to delete product data');
      }
      // Fetch product data again after deletion
      await thunkAPI.dispatch(fetchProductData());
      return productId; // Return the ID of the deleted product
    } catch (error) {
      throw error;
    }
  }
);

const productSlice = createSlice({
    name: 'product',
    initialState: {
      productData: [],
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
        .addCase(fetchProductData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProductData.fulfilled, (state, action) => {
          state.loading = false;
          state.productData = action.payload;
          // console.log(action.payload)
        })
        .addCase(fetchProductData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
          // console.log(action)
        })
        // Reducer for posting product data
        .addCase(postProductData.pending, (state) => {
          state.loading = true;
        })
        .addCase(postProductData.fulfilled, (state, action) => {
          state.loading = false;
          // state.productData = action.payload;
          state.productData = [...state.productData, action.payload];
        })
        .addCase(postProductData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message
        })
 
        // reducer for deleting product data
        .addCase(deleteProductData.pending, (state, action) => {
          state.loading = true;
          state.error = null
        })
        .addCase(deleteProductData.fulfilled, (state, action) => {
          state.loading = false;
          state.productData = state.productData.filter(product => product.idProduct !== action.payload);
        })
        .addCase(deleteProductData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message
        })

        //reducer for update product
        .addCase(updateProductData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateProductData.fulfilled, (state, action) => {
          state.loading = false;
          const updatedData = action.payload;
          console.log(updatedData);
          state.productData = state.productData.map(product =>
            product.idProduct === updatedData.idProduct ? updatedData : product
          );
        })
        .addCase(updateProductData.rejected, (state, action) => {
          state.loading = false;
          console.log(action)
          state.error = action.error.message;
        })
    },
  });
  
export default productSlice.reducer;