import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Landing from './pages/Landing'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminPanel from './pages/AdminPanel'
import Settings from './pages/Settings'
import AddItem from './pages/AddItem'
import UpdateItem from './pages/UpdateItem'
import DishOrder from './pages/DishOrder'
import Cart from './pages/Cart'
import Receipt from './pages/Receipt';
import Terms from './pages/Terms';
import './App.scss';

function App() {
  return (
   <>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Signup" element={<Signup/>}/>
      <Route path="/About" element={<About/>}/>
      <Route path="/AdminPanel" element={<AdminPanel/>}/>
      <Route path="/Settings" element={<Settings/>}/>
      <Route path="/AddItem" element={<AddItem/>}/>
      <Route path="/UpdateItem" element={<UpdateItem/>}/>
      <Route path="/DishOrder" element={<DishOrder/>}/>
      <Route path="/Cart" element={<Cart/>}/>
      <Route path="/Receipt" element={<Receipt/>}/>
      <Route path="/Terms" element={<Terms/>}/>
    </Routes>
   </>
  );
}

export default App;
