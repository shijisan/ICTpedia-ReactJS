import { useEffect, useState } from 'react';

const useAuth = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth({ token });
    } else {
      setAuth(null);
    }
  }, []);

  return auth;
};

export default useAuth;
