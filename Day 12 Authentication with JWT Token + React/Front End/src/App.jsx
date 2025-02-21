import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterUser from './Components/Admin/RegisterAdmin';
import Login from './Components/Admin/Login';

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<RegisterUser/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
