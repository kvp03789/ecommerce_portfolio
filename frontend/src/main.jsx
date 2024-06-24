import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Home from './pages/Home'
import Products from './pages/Products'
import AdminDashboard from './pages/admin/AdminDashboard'
import NavLayout from './layouts/NavLayout'
import HelpLayout from './layouts/HelpLayout'
import Faq from './pages/help/Faq'
import Contact from './pages/help/Contact'
import NotFound from './pages/NotFound'
import Orders from './pages/admin/Orders'
import AddProductForm from './pages/admin/AddProductForm'
import DashboardLayout from './layouts/DashboardLayout'
import { ProductContextProvider } from './context/ProductContext'

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route element={<NavLayout/>}>
        <Route element={<Home/>} path="/"/>
        <Route element={<Products/>} path="products"/>
        <Route element={<DashboardLayout/>} path="admin_dashboard">
          <Route path="view_orders" element={<Orders/>}/>
          <Route path="add_products" element={<AddProductForm/>}/>
        </Route>
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
    <ProductContextProvider>
      <RouterProvider router={router}/>
    </ProductContextProvider>
  </React.StrictMode>,
)
