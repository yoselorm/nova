import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components & Layouts
import PublicLayout from './components/PublicLayout';
import Preloader from './components/Preloader';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Services from './pages/Services';
import Contact from './pages/Contact';
import SurgeryCenter from './pages/subsidiaries/SurgeryCenter';
import FertilityCenter from './pages/subsidiaries/FertilityCenter';
import Pharmacy from './pages/subsidiaries/Pharmacy';
import DonatePage from './pages/Donate';

// Admin System Pages
import AdminLayout from './admin/pages/AdminLayout';
import AdminLogin from './admin/pages/Login';
import BookAppointment from './pages/BookAppointement';
import AdminDashboard from './admin/pages/Dashboard';
import ManageAppointments from './admin/pages/ManageAppointments';
import ManageBlogs from './admin/pages/ManageBlogs';
import BlogDetailView from './pages/BlogDetailView';
import BlogShowcase from './pages/Blog';
import ScrollReset from './components/ScrollReset';
import ProtectedRoute from './utils/ProtectedRoute';
import Careers from './pages/Careers';
import JobDetailView from './pages/JobDetailView';
import ManageJobs from './admin/pages/ManageJobs';
import JobApplicants from './admin/pages/JobApplicants';
// Note: Import your OverviewBoard, ManageAppointments, and ManageBlogs here when ready!

const ScrollToTop = () => {
  const { pathname } = window.location;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);

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
      <ScrollReset/>
      
      <Routes>
        {/* ==========================================================
            1. PUBLIC WEBSITE CLIENT PORTAL (Has Public Navbar/Footer)
           ========================================================== */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} /> {/* Clean redirect to root */}
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<DonatePage />} />
          {/* <Route path='/book-appointment' element={<Navigate to="/#book" replace />} />  */}
          <Route path="/blog" element={<BlogShowcase />} />
          <Route path="/blogs/:slug" element={<BlogDetailView isAdmin={false} />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:slug" element={<JobDetailView />} />
          <Route path='/book-appointment' element={<BookAppointment />} />
          
          {/* Subsidiary Focus Pages */}
          <Route path="/surgery-center" element={<SurgeryCenter />} />
          <Route path="/fertility-center" element={<FertilityCenter />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
        </Route>

        {/* ==========================================================
            2. RESTRICTED ADMIN PORTAL ENTRY (Zero Public UI Elements)
           ========================================================== */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ==========================================================
            3. INTERNAL DASHBOARD SYSTEM (Uses Dedicated Admin Layout)
           ========================================================== */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          {/* Automatically forward a bare "/admin" hit directly to dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
          {/* Un-comment these sub-views as we construct them! */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="appointments" element={<ManageAppointments />} />
          <Route path="blogs" element={<ManageBlogs />} />
          <Route path="blogs/:slug" element={<BlogDetailView isAdmin={true} />} />
          <Route path="jobs" element={<ManageJobs />} />
          <Route path="jobs/:id/applicants" element={<JobApplicants />} />
        </Route>

        {/* CATCH-ALL REDIRECT FOR BROKEN LINKS */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
    </Router>
  );
}

export default App;