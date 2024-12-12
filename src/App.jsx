import React, { useEffect, useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/navbar";
import Footer from "./components/shared/footer";
import CheckAuth from "./components/common/checkAuth";
import routes from "./config/routes";

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
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routes.map(({ path, component }, index) => {
              const LazyComponent = React.lazy(component);
              return (
                <Route key={index} path={path} element={<LazyComponent />}/>
              );
            })}
          </Routes>
        </Suspense>
        <Footer />
      </CheckAuth>
    </>
  );
};

export default App;