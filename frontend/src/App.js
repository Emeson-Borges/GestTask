import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/login'; 
import Register from './components/Register/Register'; 
import ProjectManagement from './components/ProjectManager/projectmanager'; 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/project-management" element={<ProjectManagement />} />
                {/* Outras rotas aqui */}
            </Routes>
        </Router>
    );
};

export default App;
