import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import Listing from './pages/Listing'; // ⬅️ Import your new page
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Apropos from './components/Apropos';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-neutral min-h-screen">
      <div className='text-gray-800 '>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listing />} /> 
          <Route path="/car_details/:id" element={<CarDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<Apropos />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;