// DashboardScreen.tsx
'use client'
import React from 'react';
import DashboardNav from './Dashboard Nav and Head/DashboardNav';
import DashboardHeader from './Dashboard Nav and Head/DashboardHeader'; // Import DashboardHeader
import './DashboardScreen.css';
import Dashboard from './Dashboard';

const DashboardScreen: React.FC = () => {
  return (
    <div className="DashboardScreen-app">
      <DashboardNav />
      <div className="DashboardScreen-main-content">
        
      <DashboardHeader pageTitle="DASHBOARD" /> {/* Pass the page title */} 

      <Dashboard />
        
      </div>
    </div>
  );
};

export default DashboardScreen;
