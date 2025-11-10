import React from 'react';
import { Link } from 'react-router-dom';

export default function HobbyCard({ hobby }) {
  return (
    <article className="card" aria-labelledby={`hobby-${hobby._id}`}>
      <h3 id={`hobby-${hobby._id}`}>{hobby.title}</h3>
      <p>{hobby.description ? hobby.description.slice(0, 140) : 'No description yet.'}</p>

      <div className="tags" aria-hidden={!(hobby.tags && hobby.tags.length)}>
        {(hobby.tags || []).slice(0, 6).map((t) => (
          <span className="tag" key={t}>{t}</span>
        ))}
      </div>

      <div className="event-meta" style={{ marginTop: 12 }}>
        <div className="small">Created: {new Date(hobby.createdAt).toLocaleDateString()}</div>
        <Link className="btn" to={`/hobby/${hobby._id}`}>Open</Link>
      </div>
    </article>
  );
}
