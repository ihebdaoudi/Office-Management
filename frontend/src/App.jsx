import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Assets from "./pages/Assets";
import Tickets from "./pages/Tickets";
import Users from "./pages/Users";
import Navbar from "./components/Navbar";
import AssetsMenu from "./pages/AssetsMenu";
import Application from "./pages/Application";
import Document from "./pages/Document";
import MyTickets from "./pages/MyTickets";
import React, { useState, useEffect } from 'react'

// Example Components


const App = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem('role'));
  console.log(userRole);
  const handleStorageChange = () => {
    setUserRole(localStorage.getItem('role'));
  };
  useEffect(() => {
  
    handleStorageChange()
    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={
          <Login handleStorageChange={handleStorageChange} />
        } />
        <Route
          path="/*"
          element={
            <div>
              <Navbar userRole={userRole} />
              <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto", marginTop: "30px" }}>
                <Routes>
                  <Route path="/home" element={
                    <>
                      <Home />
                    </>
                  } />
                  <Route path="/assets" element={
                    <>
                      <AssetsMenu />
                    </>
                  } />
                  <Route path="/assets/material" element={
                    <>
                      <Assets />
                    </>
                  } />
                  <Route path="/assets/app" element={
                    <>
                      <Application />
                    </>
                  } />
                  <Route path="/assets/document" element={
                    <>
                      <Document />
                    </>
                  } />
                  <Route path="/tickets" element={
                    <>
                      {
                        userRole === 'tech' ?
                          <Tickets />
                          :
                          <MyTickets />
                      }
                    </>
                  } />
                  <Route path="/users" element={
                    <>
                      <Users />
                    </>
                  } />
                </Routes>
              </div>
            </div>
          }
        />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
