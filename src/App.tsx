import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ApiPlayground from './pages/ApiPlayground';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
    // const token = localStorage.getItem("token");
    // if(token === null){
    //     window.location.href = "https://apps2.brightquery.com/login"
    //     return;
    // }
    return (
        <Router basename='/bqapi/'>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="api" element={<ApiPlayground />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
