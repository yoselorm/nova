import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. FIXED NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-[1000]">
        <Navbar />
      </header>

      {/* 2. MAIN PUBLIC CONTENT VIEWPORT */}
      {/* The padding-top ensures your pages don't slide underneath your fixed navbar */}
      <main className="flex-grow pt-24 min-h-screen">
        <Outlet /> {/* This dynamically renders whatever public page route is active */}
      </main>

      {/* 3. PUBLIC FOOTER */}
      <Footer />
    </div>
  );
};

export default PublicLayout;