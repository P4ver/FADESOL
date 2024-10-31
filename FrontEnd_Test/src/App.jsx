import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Register from './component/register';
import './App.css';
import LoginComponent from './component/loginComponent';
import PrivateRoute from './component/PrivateRoute';
import ErrorPage from './component/ErrorPage';
import PageUsers from '../src/pages/pageUsers';
import Layout from './component/layout';
import PageProducts from './pages/pageProducts';
import PageDashboard from '../src/pages/pageDashboard';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import Profile from './component/profile';
import PageListeDemande from './pages/pageListeDemande';
import PageLivraison from './pages/pageLivraison';
import PageEntree from './pages/pageEntree';
import PageListeVente from './pages/pageListeVente';
import PageReturn from './pages/pageReturn';
import PageListeReturn from './pages/pageListeReturn';
import 'react-toastify/dist/ReactToastify.css';
import PageHistorique from './pages/pageHistorique';
import InactivityHandler from './component/InactivityHandler ';
import SortX from './component/sortie';
import PageTransaction from './pages/pageTransaction';
disableReactDevTools();

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
        <InactivityHandler />
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/" element={<LoginComponent />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<ErrorPage />} />
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path="/users" element={<PageUsers />} />
                <Route path="/products" element={<PageProducts/>} />
                <Route path="/entree" element={<PageEntree/>} />
                <Route path="/sortie" element={<SortX/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/dashboard" element={<PageDashboard/>} />
                <Route path="/liste-demandes" element={<PageListeDemande />} />
                <Route path="/liste-ventes" element={<PageListeVente />} />
                <Route path="/liste-return" element={<PageListeReturn />} />
                <Route path="/historique" element={<PageHistorique />} />
                <Route path="/return" element={<PageReturn />} />
                <Route path="/livraison" element={<PageLivraison />} />
                <Route path="/transaction" element={<PageTransaction/>} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
        
      </Provider>
    </>
  );
}

export default App;