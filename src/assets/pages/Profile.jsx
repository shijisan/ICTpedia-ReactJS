import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout.cjs';
import LogoutButton from '../components/LogoutButton';

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if no token
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        setError('Failed to fetch user profile');
        console.error('Error:', error);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Profile</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <strong>First Name:</strong> {user.firstName}
      </div>
      <div className="mb-3">
        <strong>Last Name:</strong> {user.lastName}
      </div>
      <div className="mb-3">
        <strong>Email:</strong> {user.email}
      </div>
      <LogoutButton />
    </div>
  );
}

export default Profile;
