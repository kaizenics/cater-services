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
import OrderPayment from './pages/OrderPayment';
import OrderReceipt from './pages/OrderReceipt';
import Terms from './pages/Terms'
import Profile from './pages/Profile'
import UserMgt from './pages/UserMgt'
import FAQ from './pages/FAQ'
import CustomerCare from './pages/CustomerCare';
import './App.scss';
import Terms from './pages/Terms';

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
      <Route path="/OrderPayment" element={<OrderPayment/>}/>
      <Route path="/OrderReceipt" element={<OrderReceipt/>}/>
      <Route path="/Terms" element={<Terms/>}/>
      <Route path="/Profile" element={<Profile/>}/>
      <Route path="/UserMgt" element={<UserMgt/>}/>
      <Route path="/FAQ" element={<FAQ/>}/>
<<<<<<< Updated upstream
      <Route path="/Terms" element={<Terms/>}/>
=======
      <Route path="/CustomerCare" element={<CustomerCare/>}/>
>>>>>>> Stashed changes
    </Routes>
   </>
  );
}

export default App;
