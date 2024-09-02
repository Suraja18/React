import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Table from './pages/rapidAPI';
import AllHeader from './components/AllHeader';
import SQLTable from './pages/SQL';
import AddUser from './pages/User/Add';
import EditUser from './pages/User/Edit';
import ResponsiveTable from './pages/Responsive';

function App() {
  return (
    <>
      <AllHeader />
      <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/table' element={<Table />} />
         <Route path='/user' element={<SQLTable />} />
         <Route path='/user/add' element={<AddUser />} />
         <Route path='/user/edit/:id' element={<EditUser />} />
         <Route path='/responsive/table' element={<ResponsiveTable />} />
       </Routes>
    </>
  );
}

export default App;
