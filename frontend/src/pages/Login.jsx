import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      const user = response.data.user;
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(user));
      
      if (user.role_id === 1) navigate('/manager');
      else if (user.role_id === 2) navigate('/worker');
      else if (user.role_id === 3) navigate('/store');
      
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials.');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">System Login</h2>
      <p className="auth-subtitle">Spas Trout Farm Management</p>

      {location.state?.message && <div className="auth-success">{location.state.message}</div>}
      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleLogin}>
        <input className="auth-input" type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="auth-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="auth-button" type="submit">Sign In</button>
      </form>

      <p className="auth-footer">
        New client? <Link to="/register" className="auth-link">Register here</Link>
      </p>
    </div>
  );
}