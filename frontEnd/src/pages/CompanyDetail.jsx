import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import ReviewForm from '../components/ReviewForm';
import ReviewCard from '../components/ReviewCard';

const StarFilled = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="#f59e0b" style={{ display: 'block' }}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const StarEmpty = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="#d1d5db" style={{ display: 'block' }}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const LOGO_COLORS = ['#1e1b4b', '#14532d', '#7c2d12', '#3b0764', '#0c4a6e', '#064e3b'];
const getBgColor = (name = '') => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return LOGO_COLORS[Math.abs(h) % LOGO_COLORS.length];
};

const CompanyDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [company, setCompany] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [sortReviews, setSortReviews] = useState('newest');

  useEffect(() => { fetchCompany(); }, [id]);
  useEffect(() => { fetchReviews(); }, [id, sortReviews]);

  const fetchCompany = async () => {
    try {
      const res = await axios.get(`/api/companies/${id}`);
      setCompany(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/api/reviews/company/${id}`, { params: { sort: sortReviews } });
      setReviews(res.data);
    } catch (err) { console.error(err); }
  };

  if (!company) return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: 16, color: '#6b7280' }}>Loading...</span>
    </div>
  );

  const initials = company.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '28px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        {/* Back link */}
        <Link to="/" style={{ fontSize: 14, color: '#7c3aed', fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginBottom: 20 }}>
          ← Back to Companies
        </Link>

        {/* Company header card */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 28, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 16 }}>
            <div style={{
              width: 72, height: 72, minWidth: 72,
              background: getBgColor(company.name),
              borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 24 }}>{initials}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111827', margin: '0 0 4px' }}>{company.name}</h1>
              <p style={{ fontSize: 14, color: '#6b7280', margin: '0 0 4px' }}>📍 {company.address}</p>
              <p style={{ fontSize: 13, color: '#9ca3af', margin: 0 }}>📅 Founded {new Date(company.foundedOn).getFullYear()}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', gap: 3 }}>
              {[...Array(5)].map((_, i) => i < Math.floor(company.avgRating) ? <StarFilled key={i} /> : <StarEmpty key={i} />)}
            </div>
            <span style={{ fontWeight: 700, fontSize: 16, color: '#111827' }}>{company.avgRating}</span>
            <span style={{ fontSize: 14, color: '#6b7280' }}>({company.reviewCount} reviews)</span>
          </div>
          {company.description && (
            <p style={{ marginTop: 12, fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>{company.description}</p>
          )}
        </div>

        {/* Review Form */}
        {user ? (
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 14 }}>Write a Review</h2>
            <ReviewForm companyId={id} onReviewAdded={fetchReviews} />
          </div>
        ) : (
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '18px 24px', marginBottom: 24, textAlign: 'center', fontSize: 14, color: '#6b7280' }}>
            <Link to="/login" style={{ color: '#7c3aed', fontWeight: 600 }}>Log in</Link> to write a review.
          </div>
        )}

        {/* Reviews list */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>Reviews ({reviews.length})</h2>
          <select
            value={sortReviews}
            onChange={e => setSortReviews(e.target.value)}
            style={{ border: '1.5px solid #d1d5db', borderRadius: 8, padding: '8px 12px', fontSize: 14, color: '#374151', background: '#fff', fontFamily: 'inherit', outline: 'none', cursor: 'pointer' }}
          >
            <option value="newest">Newest</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {reviews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#9ca3af', fontSize: 15 }}>
            No reviews yet. Be the first!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {reviews.map(review => <ReviewCard key={review._id} review={review} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetail;
