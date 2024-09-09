import React from 'react';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Table from './pages/rapidAPI';
import SQLTable from './pages/SQL';
import AddUser from './pages/User/Add';
import EditUser from './pages/User/Edit';
import ResponsiveTable from './pages/Responsive';
import UserIndex from './pages/ShoppingMall/User';
import Login from './pages/ShoppingMall/Authenticate/Login';
import LoginwithSQL from './pages/ShoppingMall/Authenticate/LoginwithSQL';
import AdminIndex from './pages/ShoppingMall/Admin';
import PrivateRoute from './PrivateRoute';
import MallIndex from './pages/ShoppingMall/Admin/Malls/index';
import MallsAdd from './pages/ShoppingMall/Admin/Malls/Add';
import MallsView from './pages/ShoppingMall/Admin/Malls/View';
import MallsEdit from './pages/ShoppingMall/Admin/Malls/Edit';
import ShopIndex from './pages/ShoppingMall/Admin/Shops/Index';
import ShopsAdd from './pages/ShoppingMall/Admin/Shops/Add';
import ShopsView from './pages/ShoppingMall/Admin/Shops/View';
import ShopsEdit from './pages/ShoppingMall/Admin/Shops/Edit';

function Router() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/table' element={<Table />} />
                <Route path='/user' element={<SQLTable />} />
                <Route path='/user/add' element={<AddUser />} />
                <Route path='/user/edit/:id' element={<EditUser />} />
                <Route path='/responsive/table' element={<ResponsiveTable />} />
                <Route path='/test/login' element={<LoginwithSQL />} />


                {/* Starting Shopping Mall */}
                <Route path='/shopping-mall' element={<UserIndex />} />
                <Route path='/login' element={<Login />} />

                {/* Admin Protected Route */}
                <Route path="/shopping-mall/admin" element={<PrivateRoute />}>
                    <Route path="dashboard" element={<AdminIndex />} />
                    <Route path="malls" element={<MallIndex />} />
                    <Route path="malls/add" element={<MallsAdd />} />
                    <Route path="malls/view/:id" element={<MallsView />} />
                    <Route path="malls/edit/:id" element={<MallsEdit />} />
                    <Route path="shops" element={<ShopIndex />} />
                    <Route path="shops/add" element={<ShopsAdd />} />
                    <Route path="shops/view/:id" element={<ShopsView />} />
                    <Route path="shops/edit/:id" element={<ShopsEdit />} />
                </Route>

            </Routes>
        </>
    )
}

export default Router