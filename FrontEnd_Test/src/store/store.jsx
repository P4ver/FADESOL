import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import productReducer from './productSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';
import demandeReducer from "./demandeSlice";
import projetReducer from "./projetSlice";
import achatempoReducer from "./achatempoSlice";
import achatReducer from "./achatSlice";
import venteReducer from "./venteSlice";
import returnReducer from "./returnSlice";
import historiqueReducer from "./historiqueSlice";
import clientReducer from "./clientSlice";
import transactionReducer from "./transactionSlice";

// Persist Config
const persistConfig = {
  key: 'root',
  storage,
};

// Root Reducer
const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  auth: authReducer,
  demande: demandeReducer,
  projet: projetReducer,
  achatempo: achatempoReducer,
  vente: venteReducer,
  achat: achatReducer,
  return: returnReducer,
  historique: historiqueReducer,
  client: clientReducer,
  transaction: transactionReducer,
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store Configuration
const store = configureStore({
  reducer: persistedReducer,
  devTools: true, // Enable Redux DevTools
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: {
        warnAfter: 1000, // Increase the threshold to avoid frequent warnings
      },
      serializableCheck: false, // Disable serializability checks
    }),
});

export const persistor = persistStore(store);

export default store;