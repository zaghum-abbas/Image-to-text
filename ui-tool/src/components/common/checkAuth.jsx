import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CheckAuth = ({ isAuthenticated, children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname;

    if (!isAuthenticated && currentPath === "/profile") {
      navigate("/login", { replace: true });
    } else if (
      isAuthenticated &&
      (currentPath === "/login" || currentPath === "/register")
    ) {
      navigate("/profile", { replace: true });
    }
  }, [isAuthenticated]);

  return <>{children}</>;
};

export default CheckAuth;

// import { useLocation, useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// const CheckAuth = ({ isAuthenticated, children }) => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const currentPath = location.pathname;

//     if (!isAuthenticated && currentPath === "/profile") {
//       navigate("/login", { replace: true });
//     } else if (
//       isAuthenticated &&
//       (currentPath === "/login" || currentPath === "/register")
//     ) {
//       navigate("/profile", { replace: true });
//     }
//   }, [isAuthenticated, location.pathname, navigate]);

//   return <>{children}</>;
// };

// export default CheckAuth;