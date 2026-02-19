import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Cart from '../pages/Cart'
import AllProducts from '../pages/AllProducts'
import MyStore from '../pages/MyStore'
import Profile from '../pages/Profile'

export default function AllRoutes() {
    return (
        <Routes>
            <Route element={<Home />} path='/' ></Route>
            <Route element={<Login />} path='/login' ></Route>
            <Route element={<Signup />} path='/signup' ></Route>
            <Route element={<Cart />} path='/cart' ></Route>
            <Route element={<AllProducts />} path='/all-products' ></Route>
            <Route element={<MyStore />} path='/my-store' ></Route>
            <Route element={<Profile />} path='/profile' ></Route>
        </Routes>
    )
}
