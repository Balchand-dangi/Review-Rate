import React, { useState, useEffect, useContext, useRef } from 'react';
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
  const [loading, setLoading] = useState(true);
  const abortRef = useRef(null);

  // ── Parallel fetch on mount: company + reviews at the same time ──
  useEffect(() => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;

    setLoading(true);

    Promise.all([
      axios.get(`/api/companies/${id}`, { signal }),
      axios.get(`/api/reviews/company/${id}`, { params: { sort: sortReviews }, signal }),
    ])
      .then(([compRes, revRes]) => {
        setCompany(compRes.data);
        setReviews(revRes.data);
      })
      .catch(err => {
        if (axios.isCancel(err) || err.name === 'CanceledError') return;
        console.error(err);
      })
      .finally(() => setLoading(false));

    return () => abortRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ── Re-fetch only reviews when sort changes (company is already loaded) ──
  const fetchReviews = async (sortVal) => {
    try {
      const res = await axios.get(`/api/reviews/company/${id}`, { params: { sort: sortVal } });
      setReviews(res.data);
    } catch (err) { console.error(err); }
  };

  const handleSortChange = (e) => {
    const val = e.target.value;
    setSortReviews(val);
    fetchReviews(val);
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: 16, color: '#6b7280' }}>Loading...</span>
    </div>
  );

  if (!company) return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: 16, color: '#ef4444' }}>Company not found.</span>
    </div>
  );

  const initials = company.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  return (
    <>
      <style>{`
        .cd-page { min-height: 100vh; background: #f9fafb; padding: 28px 16px; }
        .cd-wrap { max-width: 800px; margin: 0 auto; }
        .cd-back {
          font-size: 14px; color: #7c3aed; font-weight: 600;
          text-decoration: none; display: inline-block; margin-bottom: 20px;
        }
        .cd-back:hover { text-decoration: underline; }
        .cd-card {
          background: #fff; border: 1px solid #e5e7eb; border-radius: 14px;
          padding: 28px; margin-bottom: 24px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }
        .cd-header-row {
          display: flex; align-items: flex-start; gap: 20px; margin-bottom: 16px; flex-wrap: wrap;
        }
        .cd-logo {
          width: 72px; height: 72px; min-width: 72px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .cd-info { flex: 1; min-width: 0; }
        .cd-name { font-size: 22px; font-weight: 800; color: #111827; margin: 0 0 4px; word-break: break-word; }
        .cd-address { font-size: 14px; color: #6b7280; margin: 0 0 4px; }
        .cd-founded { font-size: 13px; color: #9ca3af; margin: 0; }
        .cd-rating-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .cd-stars { display: flex; gap: 3px; }
        .cd-desc { margin-top: 12px; font-size: 14px; color: #6b7280; line-height: 1.6; }
        .cd-reviews-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 14px; gap: 12px; flex-wrap: wrap;
        }
        .cd-reviews-title { font-size: 18px; font-weight: 700; color: #111827; }
        .cd-sort-select {
          border: 1.5px solid #d1d5db; border-radius: 8px;
          padding: 8px 12px; font-size: 14px; color: #374151;
          background: #fff; font-family: inherit; outline: none; cursor: pointer;
        }
        .cd-empty { text-align: center; padding: 40px 20px; color: #9ca3af; font-size: 15px; }
        .cd-review-list { display: flex; flex-direction: column; gap: 12px; }

        @media (max-width: 480px) {
          .cd-page { padding: 16px 12px; }
          .cd-card { padding: 18px 16px; }
          .cd-logo { width: 56px; height: 56px; min-width: 56px; }
          .cd-name { font-size: 18px; }
          .cd-reviews-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="cd-page">
        <div className="cd-wrap">
          {/* Back link */}
          <Link to="/" className="cd-back">← Back to Companies</Link>

          {/* Company header card */}
          <div className="cd-card">
            <div className="cd-header-row">
              <div className="cd-logo" style={{ background: getBgColor(company.name) }}>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: 24 }}>{initials}</span>
              </div>
              <div className="cd-info">
                <h1 className="cd-name">{company.name}</h1>
                <p className="cd-address">📍 {company.address}</p>
                <p className="cd-founded">📅 Founded {new Date(company.foundedOn).getFullYear()}</p>
              </div>
            </div>
            <div className="cd-rating-row">
              <div className="cd-stars">
                {[...Array(5)].map((_, i) =>
                  i < Math.floor(company.avgRating) ? <StarFilled key={i} /> : <StarEmpty key={i} />
                )}
              </div>
              <span style={{ fontWeight: 700, fontSize: 16, color: '#111827' }}>{company.avgRating}</span>
              <span style={{ fontSize: 14, color: '#6b7280' }}>({company.reviewCount} reviews)</span>
            </div>
            {company.description && (
              <p className="cd-desc">{company.description}</p>
            )}
          </div>

          {/* Review Form */}
          {user ? (
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 14 }}>Write a Review</h2>
              <ReviewForm companyId={id} onReviewAdded={() => fetchReviews(sortReviews)} />
            </div>
          ) : (
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '18px 24px', marginBottom: 24, textAlign: 'center', fontSize: 14, color: '#6b7280' }}>
              <Link to="/login" style={{ color: '#7c3aed', fontWeight: 600 }}>Log in</Link> to write a review.
            </div>
          )}

          {/* Reviews list */}
          <div className="cd-reviews-header">
            <h2 className="cd-reviews-title">Reviews ({reviews.length})</h2>
            <select value={sortReviews} onChange={handleSortChange} className="cd-sort-select">
              <option value="newest">Newest</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {reviews.length === 0 ? (
            <div className="cd-empty">No reviews yet. Be the first!</div>
          ) : (
            <div className="cd-review-list">
              {reviews.map(review => <ReviewCard key={review._id} review={review} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CompanyDetail;
