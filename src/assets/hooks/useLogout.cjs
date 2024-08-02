// src/hooks/useLogout.js
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');

    // Redirect to login or any other desired page
    navigate('/login');
  };

  return logout;
};

export default useLogout;
