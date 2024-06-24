import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
// import Dashboard from './component/dashboard';
import Register from './component/register';
import './App.css';
import LoginComponent from './component/loginComponent';
import PrivateRoute from './component/PrivateRoute';
import ErrorPage from './component/ErrorPage';
import PageUsers from '../src/pages/pageUsers';
import Layout from './component/layout';
import PageProducts from './pages/pageProducts';
import Entree from './component/entree';
import Sortie from './component/sortie';
import Dashboard from "./component/dashboard"
import PageDashboard from '../src/pages/pageDashboard';
import Livraisons from './component/Livraison';
// import ListeDemandes from './component/listeDemande';
import DeliveredItemsPage from './component/livrePage';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import Profile from './component/profile';
import PageListeDemande from './pages/pageListeDemande';
import PageLivraison from './pages/pageLivraison';
import PageEntree from './pages/pageEntree';
import PageSortie from './pages/pageSortie';
import PageListeVente from './pages/pageListeVente';
import PageReturn from './pages/pageReturn';
import PageListeReturn from './pages/pageListeReturn';
disableReactDevTools()
// if (process.env.NODE_ENV === 'production') {
//   disableReactDevTools();
// }

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/" element={<LoginComponent />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<ErrorPage />} />
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path="/users" element={<PageUsers />} />
                <Route path="/products" element={<PageProducts/>} />
                {/* <Route path="/entree" element={<Entree/>} /> */}
                <Route path="/entree" element={<PageEntree/>} />
                {/* <Route path="/sortie" element={<Sortie/>} /> */}
                <Route path="/sortie" element={<PageSortie/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/dashboard" element={<PageDashboard/>} />
                {/* <Route path="/liste-demandes" element={<ListeDemandes />} /> */}
                <Route path="/liste-demandes" element={<PageListeDemande />} />
                <Route path="/liste-ventes" element={<PageListeVente />} />
                <Route path="/liste-return" element={<PageListeReturn />} />
                <Route path="/return" element={<PageReturn />} />
                {/* <Route path="/livraison" element={<DeliveredItemsPage />} /> */}
                <Route path="/livraison" element={<PageLivraison />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;



// import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// import React from 'react';
// import { Provider } from 'react-redux';
// import store from './store/store';
// import Dashboard from './component/dashboard';
// import Register from './component/register';
// import './App.css';
// import LoginComponent from './component/loginComponent';
// import PrivateRoute from './component/PrivateRoute';
// import ErrorPage from './component/ErrorPage';
// import PageUsers from './component/pages/pageusers';
// import Layout from './component/layout'; // Import the Layout component
// import pageDashboard from './component/pages/pageDashboard';
// function App() {
//   return (
//     <>
//       <Provider store={store}>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/login" element={<LoginComponent />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/*" element={<ErrorPage />} /
//             <Route element={<PrivateRoute />}>
//               <Route element={<Layout />}>
//                 <Route path="/users" element={<PageUsers />} />
//                 <Route path="/test" element={<pageDashboard />}  />
//                 {/* <Route path="/test" element={<Dashboard />} exact /> */}
//               </Route>
//             </Route>
//           </Routes>
//         </BrowserRouter>
//       </Provider>
//     </>
//   );
// }
// export default App;
// import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
//   import React from 'react';
//   import { Provider } from 'react-redux';
//   import store from './store/store'
//   import Dashboard from './component/dashboard'
//   import Register from './component/register'
//   import './App.css'
//   import LoginComponent from './component/loginComponent';
//   import PrivateRoute from './component/PrivateRoute';
//   import ErrorPage from './component/ErrorPage';
// import PageUsers from './component/pages/pageusers';
// // import pageDashboard from './component/pages/pageDashboard';
//   function App() {
//     return (
//       <>
//       <Provider store={store}>
//         <BrowserRouter>
//           <Routes>
//              <Route path="/login" element={<LoginComponent/>} />
//              <Route element={<PrivateRoute />}>
//                 <Route element={<Dashboard/>} path='/test' exact/>
//              </Route>
//              <Route path="/register" element={<Register/>} />
//              <Route path="/*" element={<ErrorPage/>} />
//              <Route path="/users" element={<PageUsers/>} />
//           </Routes>
//         </BrowserRouter>
//       </Provider>
//       </>
//     )
//   }
//   export default App
    {/* <Route element={<pageDashboard/>} path='/test' exact/> */}