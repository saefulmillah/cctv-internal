import React, {Component} from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CctvInternal } from "./pages"

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <main>
        <Routes>
            <Route path='/' element={<CctvInternal />}></Route>
          </Routes>
          <Routes>
            <Route path='/cctv' element={<CctvInternal />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    )
  }
}