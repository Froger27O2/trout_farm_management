import { Outlet } from 'react-router-dom';
import '../pages/Auth.css'; // Move the CSS import here!

export default function AuthLayout() {
  return (
    // The background wrapper stays mounted permanently
    <div className="auth-wrapper">
      {/* <Outlet /> is a placeholder where React Router will inject Login or Register */}
      <Outlet />
    </div>
  );
}