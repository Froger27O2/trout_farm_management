import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', phone: '', address: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
    } catch (err) {
      setError(err.response?.data?.error || 'Server error.');
    }
  };

  return (
    <div className="auth-container register">
      <h2 className="auth-title">Create Account</h2>
      <p className="auth-subtitle">Client Portal Registration</p>
      
      {error && <div className="auth-error">{error}</div>}
      
      <form onSubmit={handleRegister}>
        <input className="auth-input" type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
        <input className="auth-input" type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
        <input className="auth-input" type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <input className="auth-input" type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} />
        <button className="auth-button" type="submit">Register</button>
      </form>
      
      <p className="auth-footer">
        Already have an account? <Link to="/login" className="auth-link">Login here</Link>
      </p>
    </div>
  );
}