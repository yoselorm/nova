import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Services from './pages/Services';
import Contact from './pages/Contact';
import SurgeryCenter from './pages/subsidiaries/SurgeryCenter';
import FertilityCenter from './pages/subsidiaries/FertilityCenter';
import Pharmacy from './pages/subsidiaries/Pharmacy';
import DonatePage from './pages/Donate';

// This simple component handles scrolling to top and the layout structure
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Router>
      <ScrollToTop />
      
      {/* 1. FIXED NAVBAR: Always at the outmost beginning */}
      <header style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
        <Navbar />
      </header>

      {/* 2. MAIN CONTENT: Simple spacer to prevent overlap */}
      <main style={{ paddingTop: '90px', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<DonatePage />} />
          
          {/* Subsidiary Routes */}
          <Route path="/surgery-center" element={<SurgeryCenter />} />
          <Route path="/fertility-center" element={<FertilityCenter />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
        </Routes>
      </main>

      {/* 3. FOOTER */}
      <Footer />
      
    </Router>
  );
}

export default App;