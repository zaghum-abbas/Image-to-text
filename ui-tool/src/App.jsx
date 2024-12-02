import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/navbar";
import Footer from "./components/shared/footer";
import LoginForm from "./components/auth/loginForm";
import RegisterForm from "./components/auth/registerForm";
import Profile from "./view/profile";
import CheckAuth from "./components/common/checkAuth";
import ImageToText from "./view/imagetoText";
import JpgToWord from "./view/jpgtoWord";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <>
      <CheckAuth isAuthenticated={isAuthenticated}>
        <Navbar />
        <Routes>
          <Route path="/" element={<ImageToText />} />
          <Route path="/jpgToWord" element={<JpgToWord />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </CheckAuth>
    </>
  );
};

export default App;


// import React from 'react';
// import Wraper from "./components/shared/wraper";

// const App = () => {
//   return (
//     <Wraper/>
//   )
// }

// export default App;
