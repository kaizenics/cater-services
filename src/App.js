import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Landing from './pages/Landing'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import SignupForm from './pages/SignupForm'
import './App.scss';

function App() {
  return (
   <>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Signup" element={<Signup/>}/>
      <Route path="/SignupForm" element={<SignupForm/>}/>
      <Route path="/About" element={<About/>}/>
    </Routes>
   </>
  );
}

export default App;
