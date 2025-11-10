import React, { useState } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';

export default function EventCard({ event, onRsvp }) {
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);

  const handleRsvp = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (onRsvp && typeof onRsvp === 'function') {
        await onRsvp(event._id);
      } else {
               await API.post(`/events/${event._id}/rsvp`);
      }
      setJoined(true);
      alert('RSVP successful ✅');
    } catch (err) {
      console.error('RSVP failed', err);
      alert(err?.response?.data?.message || 'Failed to RSVP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="card">
      <div className="space-between" style={{ gap: 12 }}>
        <div>
          <h3>{event.title}</h3>
          <div className="kicker">{event.hobbyTitle || 'Hobby Event'}</div>
        </div>

        <div className="avatar" title="organizer initials">
                   PR
        </div>
      </div>

      <p className="small" style={{ marginTop: 8 }}>{event.description}</p>

      <div className="event-meta">
        <div className="when">{new Date(event.startAt).toLocaleString()}</div>
        <div className="where">{event.address || 'Online / TBA'}</div>
      </div>

      <div style={{ marginTop: 12 }} className="flex">
        <button className="btn" onClick={handleRsvp} disabled={loading || joined}>
          {joined ? 'Joined' : (loading ? 'Processing...' : 'RSVP')}
        </button>

        <Link className="btn ghost" to={`/events/${event._id}`}>Details</Link>
      </div>
    </article>
  );
}
