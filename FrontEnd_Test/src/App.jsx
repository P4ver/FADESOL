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
import PageDashboard from '../src/pages/pageDashboard';
import Layout from './component/layout';
import PageProducts from './pages/pageProducts';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<ErrorPage />} />
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path="/users" element={<PageUsers />} />
                <Route path="/" element={<PageDashboard />} exact />
                <Route path="/products" element={<PageProducts/>} />
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
//             <Route path="/*" element={<ErrorPage />} />

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