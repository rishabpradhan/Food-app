import { Navigate } from "react-router-dom";
export default function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  try {
    if (!token || role !== "admin") {
      return <Navigate to="/AdminLogin" />;
    }
  } catch {
    localStorage.removeItem("token");
    return <Navigate to="/AdminLogin" />;
  }

  return children;
}
