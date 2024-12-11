import React from 'react';
import Login_Signup from '../../Pages/Auth/Login_Signup';
import "./MyApp.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function MyApp() {
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Login_Signup />} />
                </Routes>
            </Router>
        </>
    )
}

export default MyApp