import React from 'react';
import useLogout from '../hooks/useLogout.cjs';

function LogoutButton() {
  const logout = useLogout();

  return (
    <button onClick={logout} className="btn btn-danger">
      Logout
    </button>
  );
}

export default LogoutButton;
