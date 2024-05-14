// import { configureStore } from '@reduxjs/toolkit';
// import productReducer from './productSlice';
// import userReducer from './userSlice';
// import authReducer from './authSlice'
// // 
// const store = configureStore({
//   reducer: {
//     product: productReducer,
//     user: userReducer,
//     auth: authReducer
//   },
// });

// export default store;



import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import productReducer from './productSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  auth: authReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
