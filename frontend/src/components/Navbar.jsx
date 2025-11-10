import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="container">
      <div className="navbar" role="navigation" aria-label="main navigation">
        <div className="brand">
          <div className="logo">HH</div>
          <div>
            <div style={{ fontSize: 14 }}>HobbyHive</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>Discover • Share • Connect</div>
          </div>
        </div>

        <nav className="nav-links" aria-label="primary">
          <Link to="/">Discover</Link>
          <Link to="/groups">Groups</Link>
          <Link to="/events">Events</Link>

          {token ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button className="btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="btn" to="/login">Get started</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
