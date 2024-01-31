import './App.css';
import React from 'react';
import { Routes, Route} from 'react-router-dom'; 
import Home from './Pages/Home.js';
import About from './Pages/About.js';
import Info from './Pages/Info.js';
import Contact from './Pages/Contact.js';
import Footer from './Components/Footer.js';


function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Info" element={<Info />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
     <Footer />
    </div>
  );
}

export default App;
