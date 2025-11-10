import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [hobbies, setHobbies] = useState([]);

  useEffect(() => {
    API.get('/hobbies').then((res) => setHobbies(res.data)).catch(() => {});
  }, []);

  return (
    <div
      style={{
        fontFamily: 'Poppins, sans-serif',
        backgroundColor: '#f4f7fb',
        minHeight: '100vh',
        padding: '50px 40px',
        color: '#333',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          color: '#2C3E50',
          fontSize: '30px',
          marginBottom: '40px',
          fontWeight: '600',
          letterSpacing: '1px',
        }}
      >
        🌟 Discover Amazing Hobbies 🌟
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '25px',
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
      >
        {hobbies.length === 0 ? (
          <div
            style={{
              gridColumn: '1/-1',
              textAlign: 'center',
              color: '#777',
              fontSize: '18px',
            }}
          >
            ⏳ Loading hobbies or none available yet...
          </div>
        ) : (
          hobbies.map((h) => (
            <div
              key={h._id}
              style={{
                backgroundColor: '#fff',
                borderRadius: '14px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                padding: '20px',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: '20px',
                    color: '#6C63FF',
                    marginBottom: '10px',
                    textAlign: 'center',
                    fontWeight: '600',
                  }}
                >
                  {h.title}
                </h3>
                <p
                  style={{
                    fontSize: '15px',
                    color: '#555',
                    lineHeight: '1.6',
                    textAlign: 'center',
                    minHeight: '60px',
                  }}
                >
                  {h.description?.slice(0, 100) || 'No description available.'}
                </p>
              </div>

              <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <Link
                  to={`/hobby/${h._id}`}
                  style={{
                    backgroundColor: '#6C63FF',
                    color: '#fff',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '15px',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = '#5848D2')}
                  onMouseOut={(e) => (e.target.style.backgroundColor = '#6C63FF')}
                >
                  Explore →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
