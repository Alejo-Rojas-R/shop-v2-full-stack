import React, { createContext, useState } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { ItemPage } from '../components/pages/ItemPage';
import { SearchPage } from '../components/pages/SearchPage';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { LoginPage } from '../components/pages/LoginPage';
import { RegisterPage } from '../components/pages/RegisterPage';
import { AccountPage } from '../components/pages/AccountPage';

export const CartCountContext = createContext(null);
export const UserInfoContext = createContext(null);
export const OrderDialogContext = createContext(null);

export const Routing = () => {

    const countCartItems = JSON.parse(localStorage.getItem('cart'))?.length;
    const [cartCount, setCartCount] = useState(countCartItems ?? 0);
    const [userInfo, setUserInfo] = useState(null);
    const [showDialog, setShowDialog] = useState(false);

    return (
        <CartCountContext.Provider value={{ cartCount, setCartCount }}>
            <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
                <OrderDialogContext.Provider value={{ showDialog, setShowDialog }}>
                    <BrowserRouter>
                        <Header />
                        <div className='body'>
                            <Routes>
                                <Route path='/' element={<SearchPage />} />
                                <Route path='/home' element={<Navigate to='/' />} />
                                <Route path='/product/:id' element={<ItemPage />} />
                                <Route path='/search' element={<SearchPage />} />

                                <Route path='/login' element={!userInfo ? <LoginPage /> : <Navigate to='/account' />} />
                                <Route path='/register' element={!userInfo ? <RegisterPage /> : <Navigate to='/account' />} />

                                <Route path='/account' element={userInfo ? <AccountPage /> : <Navigate to='/login' />} />
                                {/*
                        <Route path='*' element={<NotFound />} />
                        */}
                            </Routes>
                        </div>
                        <Footer />
                    </BrowserRouter>
                </OrderDialogContext.Provider>
            </UserInfoContext.Provider>
        </CartCountContext.Provider>
    )
}