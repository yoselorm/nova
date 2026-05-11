import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

// Pages (You'll create these files in your src/pages folder)
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Services from './pages/Services';
import Contact from './pages/Contact';
import SurgeryCenter from './pages/subsidiaries/SurgeryCenter';
import FertilityCenter from './pages/subsidiaries/FertilityCenter';
import Pharmacy from './pages/subsidiaries/Pharmacy';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This waits for all images, fonts, and scripts to finish
    const handleLoad = () => {
      // Small timeout to ensure the transition feels smooth
      setTimeout(() => setLoading(false), 500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <Router>
      <div className="font-nova">
        <AnimatePresence mode="wait">
          {loading && <Preloader key="loader" />}
        </AnimatePresence>

        {/* The rest of the app only renders/reveals when loading is false */}
        {!loading && (
          <div className="fade-in">
            <Navbar />
            
            {/* Add a wrapper or top padding so content doesn't hide under the fixed navbar */}
            <div className="pt-24"> 
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/team" element={<Team />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Subsidiary Routes */}
                <Route path="/surgery-center" element={<SurgeryCenter />} />
                <Route path="/fertility-center" element={<FertilityCenter />} />
                <Route path="/pharmacy" element={<Pharmacy />} />
              </Routes>
            </div>

            <Footer />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;