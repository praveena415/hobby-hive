import React, { useEffect, useState } from 'react';
import API from '../api/axios';

export default function Dashboard() {
  const [me, setMe] = useState(null);
  const [hobbyTitle, setHobbyTitle] = useState('');
  const [hobbies, setHobbies] = useState([]);

  useEffect(() => {
    API.get('/auth/me').then(res => setMe(res.data.user)).catch(() => {});
    fetchHobbies();
  }, []);

  const fetchHobbies = () => API.get('/hobbies').then(res => setHobbies(res.data)).catch(() => {});
  const createHobby = async () => {
    if (!hobbyTitle) return;
    await API.post('/hobbies', { title: hobbyTitle, description: '' });
    setHobbyTitle('');
    fetchHobbies();
  };

  return (
    <div
      style={{
        fontFamily: 'Poppins, sans-serif',
        backgroundColor: '#f4f7fb',
        minHeight: '100vh',
        padding: '40px',
        color: '#333',
      }}
    >
      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          backgroundColor: '#fff',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          padding: '30px',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            color: '#2C3E50',
            marginBottom: '10px',
            fontSize: '28px',
          }}
        >
          Dashboard
        </h2>

        {me && (
          <div
            style={{
              textAlign: 'center',
              fontSize: '18px',
              color: '#555',
              marginBottom: '25px',
            }}
          >
            👋 Welcome, <strong>{me.name}</strong>!
          </div>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '30px',
          }}
        >
          <input
            value={hobbyTitle}
            onChange={(e) => setHobbyTitle(e.target.value)}
            placeholder="Enter new hobby title"
            style={{
              flex: 1,
              padding: '10px 15px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px',
              outline: 'none',
              transition: '0.3s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#6C63FF')}
            onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          />

          <button
            onClick={createHobby}
            style={{
              backgroundColor: '#6C63FF',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#5848D2')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#6C63FF')}
          >
            ➕ Create
          </button>
        </div>

        <h3
          style={{
            color: '#444',
            borderBottom: '2px solid #6C63FF',
            paddingBottom: '8px',
            marginBottom: '15px',
            fontSize: '20px',
          }}
        >
          Your Hobbies
        </h3>

        {hobbies.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999' }}>No hobbies yet. Add one above!</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {hobbies.map((h) => (
              <li
                key={h._id}
                style={{
                  background: '#f8f8ff',
                  marginBottom: '10px',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                🎯 {h.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
