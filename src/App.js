import './App.css';
import React from 'react';
import { Routes, Route} from 'react-router-dom'; 
import Home from './Pages/Home.js';
import Info from './Pages/Info.js';
import Contact from './Pages/Contact.js';
import Footer from './Components/Footer.js';
import NavBar from './Components/NavBar.js';
import Checkout from './Pages/Checkout.js';


function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="content">
     <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      </div>
     <Footer />
    </div>
  );
}

export default App;
