import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Signin from './pages/Signin.jsx';
import {Routes,Route,Navigate} from 'react-router-dom';
import Signup from './pages/Signup.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/signin"/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default App
