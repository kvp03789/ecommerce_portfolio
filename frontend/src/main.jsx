import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home'
import Products from './pages/Products'
import AdminDashboard from './pages/AdminDashboard'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import NavLayout from './layouts/NavLayout'
import HelpLayout from './layouts/HelpLayout'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route element={<NavLayout/>}>
        <Route element={<Home/>} path="/"/>
        <Route element={<Products/>} path="/products"/>
        <Route element={<AdminDashboard/>} path="/admin_dashboard"/>
        <Route path="help" element={<HelpLayout />}>
          <Route path="faq" element={<Faq/>}/>
          <Route path="contact" element={<Contact />}/>
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Route> 
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
