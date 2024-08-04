import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        email,
        password
      });

      console.log(response.data);
      // Save the token to localStorage or context if needed
      localStorage.setItem('adminToken', response.data.token);

      navigate('/admin/dashboard'); // Use navigate function to redirect
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;
