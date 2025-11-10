import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #74ABE2, #5563DE)',
      fontFamily: 'Poppins, sans-serif',
    }}>
      <form
        onSubmit={submit}
        style={{
          background: '#fff',
          padding: '40px 30px',
          borderRadius: 12,
          boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: 380,
          textAlign: 'center',
        }}
      >
        <h2 style={{ color: '#333', marginBottom: 20 }}>Create Account</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          style={{
            width: '100%',
            padding: '10px 12px',
            margin: '8px 0',
            borderRadius: 8,
            border: '1px solid #ccc',
            fontSize: 15,
          }}
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          type="email"
          style={{
            width: '100%',
            padding: '10px 12px',
            margin: '8px 0',
            borderRadius: 8,
            border: '1px solid #ccc',
            fontSize: 15,
          }}
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          style={{
            width: '100%',
            padding: '10px 12px',
            margin: '8px 0 16px 0',
            borderRadius: 8,
            border: '1px solid #ccc',
            fontSize: 15,
          }}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            background: '#5563DE',
            color: '#fff',
            padding: '10px 0',
            border: 'none',
            borderRadius: 8,
            fontSize: 16,
            cursor: 'pointer',
            transition: 'background 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.background = '#3942B7')}
          onMouseOut={(e) => (e.target.style.background = '#5563DE')}
        >
          Register
        </button>

        <p style={{ marginTop: 15, color: '#555' }}>
          Already have an account?{' '}
          <span
            style={{
              color: '#5563DE',
              cursor: 'pointer',
              fontWeight: 600,
            }}
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
