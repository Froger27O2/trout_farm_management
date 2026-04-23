import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthLayout from './components/AuthLayout';
import ManagerDashboard from './pages/ManagerDashboard';
import WorkerDashboard from './pages/WorkerDashboard';
import ClientStore from './pages/ClientStore';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* PUBLIC ROUTES (Wrapped in the animated background) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* PROTECTED ROUTES (These do NOT get the fish background) */}
        <Route path="/manager" element={
          <ProtectedRoute allowedRoles={[1]}>
            <ManagerDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/worker" element={
          <ProtectedRoute allowedRoles={[2]}>
            <WorkerDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/store" element={
          <ProtectedRoute allowedRoles={[3]}>
            <ClientStore />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;