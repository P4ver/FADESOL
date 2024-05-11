import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import Login from './component/login'
import Test from './component/test'
import ProductComponent from './component/ProductComponent'
import UserComponent from './component/userComponent'
import Access from './component/access'
import Dashboard from './component/dashboard'
import Register from './component/register'
import Access2 from './component/access2'
import './App.css'
function App() {

  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/user" element={<UserComponent/>} />
          <Route path="/produits" element={<ProductComponent/>} />
          <Route path="/login" element={<Login/>} />
          {/* <Route path="/test" element={<Test/>} /> */}
          <Route path="/access" element={<Access/>} />
          <Route path="/access2" element={<Access2/>} />
          <Route path="/test" element={<Dashboard/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
