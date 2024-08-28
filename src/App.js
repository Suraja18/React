import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Table from './pages/rapidAPI';
import AllHeader from './components/AllHeader';

function App() {
  return (
    <>
      <AllHeader />
      <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/table' element={<Table />} />
       </Routes>
    </>
  );
}

export default App;
