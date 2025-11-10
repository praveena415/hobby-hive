import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      if (res.data.user) localStorage.setItem('me', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed', err);
      alert(err?.response?.data?.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: 'Poppins, sans-serif',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6C63FF, #A294FF)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '14px',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
          width: '100%',
          maxWidth: '420px',
          textAlign: 'center',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        <h2
          style={{
            marginBottom: '25px',
            fontSize: '28px',
            color: '#2C3E50',
            letterSpacing: '0.5px',
          }}
        >
          Welcome Back 👋
        </h2>

        <form onSubmit={submit}>
          <div style={{ textAlign: 'left' }}>
            <label
              style={{
                display: 'block',
                fontWeight: '600',
                color: '#333',
                marginBottom: '6px',
                fontSize: '15px',
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                marginBottom: '16px',
                fontSize: '15px',
                transition: 'border 0.3s',
              }}
              onFocus={(e) => (e.target.style.border = '1px solid #6C63FF')}
              onBlur={(e) => (e.target.style.border = '1px solid #ccc')}
            />

            <label
              style={{
                display: 'block',
                fontWeight: '600',
                color: '#333',
                marginBottom: '6px',
                fontSize: '15px',
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '15px',
                marginBottom: '24px',
                transition: 'border 0.3s',
              }}
              onFocus={(e) => (e.target.style.border = '1px solid #6C63FF')}
              onBlur={(e) => (e.target.style.border = '1px solid #ccc')}
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            style={{
              width: '100%',
              backgroundColor: busy ? '#aaa' : '#6C63FF',
              color: '#fff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: busy ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s ease',
              marginBottom: '15px',
            }}
            onMouseOver={(e) => !busy && (e.target.style.backgroundColor = '#5848D2')}
            onMouseOut={(e) => !busy && (e.target.style.backgroundColor = '#6C63FF')}
          >
            {busy ? 'Logging in...' : 'Login'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/register')}
            disabled={busy}
            style={{
              width: '100%',
              backgroundColor: '#fff',
              color: '#6C63FF',
              border: '2px solid #6C63FF',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#6C63FF';
              e.target.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#fff';
              e.target.style.color = '#6C63FF';
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
