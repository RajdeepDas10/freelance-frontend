import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/Auth-provider";

// Protected Route component
export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log("children", children);
  console.log("allowedRoles", allowedRoles);

  if (!user) {
    navigate("/login");
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    navigate("/unauthorized");
    return null;
  }

  return children;
};
