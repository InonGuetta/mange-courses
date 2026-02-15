import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectIsAuthenticated } from "../../../store/slicesAndThunks/authSlice";


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) return <Navigate to="/sign-in" replace />;

  return children;
};

export default ProtectedRoute;
