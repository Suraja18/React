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

function App() {
  return (
    <>
      <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/table' element={<Table />} />
         <Route path='/user' element={<SQLTable />} />
         <Route path='/user/add' element={<AddUser />} />
         <Route path='/user/edit/:id' element={<EditUser />} />
         <Route path='/responsive/table' element={<ResponsiveTable />} />
         <Route path='/shopping-mall' element={<UserIndex />} />
         <Route path='/shopping-mall/admin' element={<AdminIndex />} />
         <Route path='/login' element={<Login />} />
         <Route path='/test/login' element={<LoginwithSQL />} />
       </Routes>
    </>
  );
}

export default App;
