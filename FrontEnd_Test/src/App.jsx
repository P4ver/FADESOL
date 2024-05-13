import { BrowserRouter, Route, Routes, Navigate  } from 'react-router-dom'
import React, { useState } from 'react';
import { Provider } from 'react-redux'
import store from './store/store'
import Login from './component/login'
import ProductComponent from './component/ProductComponent'
import UserComponent from './component/userComponent'
import Dashboard from './component/dashboard'
import Register from './component/register'
import './App.css'
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/user" element={<UserComponent/>} />
          <Route path="/produits" element={<ProductComponent/>} />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/test"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
