import { useState } from 'react';
import axios from 'axios';
import LogoutButton from '../components/LogoutButton'

function AdminPage() {
  const [adminData, setAdminData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleAdminChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const addAdmin = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('http://localhost:5000/api/admin/add', adminData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Admin added successfully');
    } catch (error) {
      alert('Error adding admin: ' + error.response?.data?.error || error.message);
    }
  };

  return (
    <>
      <div>
        <h1>Admin Page</h1>
        <section>
          <h2>Add Admin</h2>
          <form onSubmit={addAdmin}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={adminData.firstName}
              onChange={handleAdminChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={adminData.lastName}
              onChange={handleAdminChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={adminData.email}
              onChange={handleAdminChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={adminData.password}
              onChange={handleAdminChange}
            />
            <button type="submit">Add Admin</button>
          </form>
        </section>
        <LogoutButton />
      </div>
    </>
  );
}

export default AdminPage;
