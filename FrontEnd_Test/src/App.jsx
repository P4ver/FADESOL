  import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
  import React from 'react';
  // import { Provider  } from 'react-redux'
  import { Provider } from 'react-redux';

  import store from './store/store'

  import Login from './component/login'
  import ProductComponent from './component/ProductComponent'
  import UserComponent from './component/userComponent'
  import Dashboard from './component/dashboard'
  import Register from './component/register'
  import './App.css'
  import LoginComponent from './component/loginComponent';
  import PrivateRoute from './component/PrivateRoute';

  function App() {

    return (
      <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
             <Route element={<PrivateRoute />}>
                <Route element={<Dashboard/>} path='/test' exact/>
             </Route>
             <Route path="/login" element={<Login/>} />
             <Route path="/register" element={<Register/>} />
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