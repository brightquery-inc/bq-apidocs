import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ApiPlayground from './pages/ApiPlayground';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="api-playground" element={<ApiPlayground />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
