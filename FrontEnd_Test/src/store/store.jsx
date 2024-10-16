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
import returnReducer from "./returnSlice"
import historiqueReducer from "./historiqueSlice"
import clientReducer from "./clientSlice"
import transactionReducer from "./transactionSlice"

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  auth: authReducer,
  demande: demandeReducer,
  projet: projetReducer,
  achatempo: achatempoReducer,
  vente: venteReducer,
  achat : achatReducer,
  return : returnReducer,
  historique : historiqueReducer,
  client : clientReducer,
  transaction : transactionReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true // Set to true to always enable dev tools
});

export const persistor = persistStore(store);

export default store;
