
// redux/reducers/authReducer.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_FAILURE } from './authActions'
const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;

{/*============================================================*/}

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // export const loginAsync = createAsyncThunk(
// //   'auth/login',
// //   async (formData, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.post('http://localhost:3000/auth/login', formData, {
// //         withCredentials: true,
// //       });
// //       return response.data;
// //     } catch (error) {
// //       return rejectWithValue(error.response.data);
// //     }
// //   }
// // );

// export const loginAsync = createAsyncThunk(
//   'auth/login',
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('http://localhost:3000/auth/login', formData, {
//         withCredentials: true,
//       });
//       return response.data;
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.message) {
//         // Extract the error message from the response data
//         return rejectWithValue(error.response.data.message);
//       } else {
//         // If there's no specific error message, return a generic one
//         return rejectWithValue('Login failed. Please try again.');
//       }
//     }
//   }
// );




// export const logoutAsync = createAsyncThunk(
//     'auth/logout',
//     async (_, { rejectWithValue }) => {
//       try {
//         await axios.post('http://localhost:3000/auth/logout', {}, {
//           withCredentials: true,
//         });
//         return null; // Return null on successful logout
//       } catch (error) {
//         return rejectWithValue(error.message);
//       }
//     }
//   );

// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   error: null,
//   loading: false,
// };

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.isAuthenticated = true;
//       state.user = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     loginFailure: (state, action) => {
//       state.isAuthenticated = false;
//       state.user = null;
//       state.error = action.payload;
//     },
//     logout: (state) => {
//         state.isAuthenticated = false;
//         state.user = null;
//         state.error = null;
//       },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginAsync.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginAsync.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload;
//         // Dispatch login success action to update state
//         state.error = null;
//       })
      
//       .addCase(loginAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = false;
//         state.error = action.payload;
//       })
//       .addCase(logoutAsync.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(logoutAsync.fulfilled, (state) => {
//         state.loading = false;
//         state.isAuthenticated = false;
//         state.user = null;
//       })
//       .addCase(logoutAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { loginSuccess, loginFailure, logout  } = authSlice.actions;
// export const selectAuth = (state) => state.auth;
// export default authSlice.reducer;


{/*================================================================================*/}
{/*================================================================================*/}

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const loginAsync = createAsyncThunk(
//   'auth/login',
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('http://localhost:3000/auth/login', formData, {
//         withCredentials: true,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   error: null,
//   loading: false,
// };

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginAsync.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginAsync.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload;
//       })
//       .addCase(loginAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export const selectAuth = (state) => state.auth;
// export default authSlice.reducer;
