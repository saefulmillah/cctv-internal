import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { CctvInternal } from "./pages"
import CctvGridView from './pages/CctvGridView'
import Login from './pages/Login'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Routes>
            <Route path='/' element={<CctvInternal />}></Route>
          </Routes>
          <Routes>
            <Route path='/login/' element={<Login />}></Route>
          </Routes>
          <Routes>
            <Route path='/cctv' element={<CctvInternal />}></Route>
          </Routes>
          <Routes>
            <Route path='/cctv/grid/:offset/:limit' element={<CctvGridView />}></Route>
          </Routes>
          <Routes>
            <Route path='/cctv/grid/' element={<Navigate to="/cctv/grid/0/9" />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    )
  }
}