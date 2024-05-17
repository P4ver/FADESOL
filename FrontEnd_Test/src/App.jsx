// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './store/store';
// import Layout from './component/Layout/layout';
// import Dashboard from './component/dashboard';
// import Register from './component/register';
// import LoginComponent from './component/loginComponent';
// import PrivateRoute from './component/PrivateRoute';
// import ErrorPage from './component/ErrorPage';

// function App() {
//   return (
//     <Provider store={store}>
//       <BrowserRouter>
//         <Routes>
//           {/* Use layout for routes that need it */}
//           <Route
//             element={
//               <Layout>
//                 {/* Protected routes */}
//                 <Route
//                   element={<PrivateRoute />}
//                   path="/test"
//                   exact
//                 >
//                   <Route path="/" element={<Dashboard />} />
//                 </Route>

//                 {/* Public routes */}
//                 <Route path="/login" element={<LoginComponent />} />
//                 <Route path="/register" element={<Register />} />
//               </Layout>
//             }
//           />
//           {/* Fallback route for 404 */}
//           <Route path="/*" element={<ErrorPage />} />
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   );
// }

// export default App;


import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
  import React from 'react';
  import { Provider } from 'react-redux';
  import store from './store/store'
  // import Login from './component/oldComponent/login'
  // import ProductComponent from './component/ProductComponent'
  // import UserComponent from './component/userComponent'
  import Dashboard from './component/dashboard'
  import Register from './component/register'
  import './App.css'
  import LoginComponent from './component/loginComponent';
  import PrivateRoute from './component/PrivateRoute';
  import ErrorPage from './component/ErrorPage';

  function App() {

    return (
      <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
             <Route element={<PrivateRoute />}>
                <Route element={<Dashboard/>} path='/test' exact/>
             </Route>
             <Route path="/login" element={<LoginComponent/>} />
             <Route path="/register" element={<Register/>} />
             <Route path="/*" element={<ErrorPage/>} />
          </Routes>
        </BrowserRouter>
      </Provider>
      </>
    )
  }

  export default App
  
  {/* <Route path="/user" element={<UserComponent/>} />
  <Route path="/produits" element={<ProductComponent/>} /> */}
  {/* <Route path="/login" element={<LoginComponent/>} />
  <Route path="/test" element={ <Dashboard />} /> */}
  // const [isAuthenticated, setIsAuthenticated] = useState(true);
  // console.log("=====>",isAuthenticated)
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // useEffect(() => {
  //   // Check if user is authenticated
  //   const isAuth = localStorage.getItem('isAuth');
  //   setIsLoggedIn(!!isAuth); // Convert string to boolean
  // }, []);


  {/* <Route path="/login" element={<Login/>} /> */}
  {/* <Route path="/test" element={<Dashboard/>} /> */}