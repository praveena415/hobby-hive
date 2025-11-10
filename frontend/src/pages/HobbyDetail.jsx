import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';

export default function HobbyDetail() {
  const { id } = useParams();
  const [hobby, setHobby] = useState(null);
  const [resources, setResources] = useState([]);
  const [resUrl, setResUrl] = useState('');

  useEffect(() => {
    API.get(`/hobbies/${id}`).then((r) => setHobby(r.data)).catch(() => {});
    API.get(`/resources/hobby/${id}`).then((r) => setResources(r.data)).catch(() => {});
  }, [id]);

  const addResource = async () => {
    if (!resUrl) return;
    await API.post('/resources', { title: 'Shared link', url: resUrl, hobby: id });
    setResUrl('');
    const r = await API.get(`/resources/hobby/${id}`);
    setResources(r.data);
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
        {hobby ? (
          <>
            <h2
              style={{
                textAlign: 'center',
                color: '#2C3E50',
                fontSize: '26px',
                marginBottom: '10px',
              }}
            >
              {hobby.title}
            </h2>
            <p
              style={{
                textAlign: 'center',
                color: '#555',
                marginBottom: '25px',
                fontSize: '16px',
                lineHeight: '1.6',
              }}
            >
              {hobby.description || 'No description provided.'}
            </p>

            <h3
              style={{
                color: '#444',
                borderBottom: '2px solid #6C63FF',
                paddingBottom: '8px',
                marginBottom: '15px',
                fontSize: '20px',
              }}
            >
              Resources
            </h3>

            {resources.length === 0 ? (
              <p style={{ color: '#999', textAlign: 'center' }}>
                No resources shared yet. Add one below!
              </p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px' }}>
                {resources.map((r) => (
                  <li
                    key={r._id}
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
                    🔗{' '}
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: '#6C63FF',
                        textDecoration: 'none',
                        fontWeight: '500',
                      }}
                      onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
                      onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
                    >
                      {r.title || r.url}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '20px',
              }}
            >
              <input
                value={resUrl}
                onChange={(e) => setResUrl(e.target.value)}
                placeholder="Enter resource URL"
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
                onClick={addResource}
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
                ➕ Add
              </button>
            </div>
          </>
        ) : (
          <div
            style={{
              textAlign: 'center',
              color: '#777',
              fontSize: '18px',
              padding: '50px 0',
            }}
          >
            ⏳ Loading hobby details...
          </div>
        )}
      </div>
    </div>
  );
}
