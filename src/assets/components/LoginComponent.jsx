import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

function LoginComponent() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);  // Store token in localStorage
        navigate('/profile');  // Redirect to /profile
      } else {
        throw new Error('Token not received');
      }
    } catch (error) {
      setError('Invalid email or password');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <form className='card p-lg-5 p-2 form justify-content-evenly' onSubmit={handleSubmit}>
        <h2 className='text-center mb-5'>Login</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <small className='text-center mb-3'>Don't have an account? <a href="/register">Register</a></small>
        <button type="submit" className="btn btn-primary">Login</button>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </form>
    </div>
  );
}

export default LoginComponent;
