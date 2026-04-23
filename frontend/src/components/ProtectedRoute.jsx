// frontend/src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRoles }) {
  const userString = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  // If not logged in, kick to login page
  if (!token || !userString) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userString);

  // If they don't have the right role, kick them to their proper dashboard
  if (allowedRoles && !allowedRoles.includes(user.role_id)) {
    if (user.role_id === 1) return <Navigate to="/manager" replace />;
    if (user.role_id === 2) return <Navigate to="/worker" replace />;
    if (user.role_id === 3) return <Navigate to="/store" replace />;
  }

  // If they pass, render the page
  return children;
}