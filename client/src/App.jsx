import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {Routes,Route,Navigate} from 'react-router-dom';

import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import Error  from './pages/Error.jsx';
import Features from './pages/Features.jsx';
import Contact from './pages/Contact.jsx';
import Changepws from './pages/Changepws.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/signin"/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/home/features" element={<Features/>}/>
        <Route path="/home/contact" element={<Contact/>}/>
        <Route path="/home/changePws" element={<Changepws/>}/>
        <Route path="/*" element={<Error msg={"Page not founded!"}/>}/>
      </Routes>
    </>
  )
}

export default App
