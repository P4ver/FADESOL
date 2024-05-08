import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import Login from './component/login'
import Test from './component/test'
import ProductComponent from './component/ProductComponent'
import './App.css'
function App() {

  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/produits" element={<ProductComponent/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/test" element={<Test/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
