import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage/RegisterPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import FeedPage from './pages/FeedPage/FeedPage';

const AppRouter = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<RegisterPage/>}/>
          <Route path="/dashboard" element={<DashboardPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/feed" element={<FeedPage/>}/>
        </Routes>
    </Router>
  );
};

export default AppRouter;
