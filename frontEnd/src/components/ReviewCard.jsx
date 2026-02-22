import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const StarFilled = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="#f59e0b" style={{ display: 'block' }}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const StarEmpty = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="#d1d5db" style={{ display: 'block' }}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ReviewCard = ({ review }) => {
  const { user } = useContext(AuthContext);
  const userName = review.userId?.fullName || review.fullName || 'Anonymous';

  // NOTE: The auth API returns { id, email, fullName, role } — NOT { _id }.
  // So we must use user.id here, not user._id.
  const getUserId = (u) => u?.id || u?._id || null;

  const computeLiked = (u) => {
    const uid = getUserId(u);
    if (!uid) return false;
    return (review.likes || []).some(l => l.userId?.toString() === uid.toString());
  };

  const [liked, setLiked] = useState(() => computeLiked(user));
  const [likeCount, setLikeCount] = useState(review.likes?.length || 0);
  const [loading, setLoading] = useState(false);

  // Re-sync liked state when:
  // 1. user logs in/out (user changes)
  // 2. review prop is refreshed from parent (review.likes changes)
  useEffect(() => {
    setLiked(computeLiked(user));
    setLikeCount(review.likes?.length || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, review.likes]);

  const handleLike = async () => {
    if (!user || loading) return;
    setLoading(true);

    // Optimistic update
    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikeCount(prev => wasLiked ? prev - 1 : prev + 1);

    try {
      const res = await axios.post(`/api/reviews/${review._id}/like`);
      // Sync with the authoritative server response
      setLikeCount(res.data.likes);
      setLiked(res.data.isLiked);
    } catch (err) {
      // Revert optimistic update on failure
      console.error('Like failed:', err);
      setLiked(wasLiked);
      setLikeCount(prev => wasLiked ? prev + 1 : prev - 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: 12,
      padding: '20px 24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    }}>
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
        <div>
          <h4 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>{review.subject}</h4>
          <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 8px' }}>{userName}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[1, 2, 3, 4, 5].map(i => i <= review.rating ? <StarFilled key={i} /> : <StarEmpty key={i} />)}
            </div>
            <span style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>{review.rating}</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#9ca3af' }}>
            {new Date(review.createdAt).toLocaleDateString('en-GB')}
          </span>
          {/* Like button */}
          <button
            onClick={handleLike}
            disabled={!user || loading}
            title={!user ? 'Log in to like this review' : liked ? 'Unlike' : 'Like'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              background: 'none',
              border: `1.5px solid ${liked ? '#ef4444' : '#e5e7eb'}`,
              borderRadius: 20,
              padding: '4px 12px',
              cursor: user && !loading ? 'pointer' : 'not-allowed',
              color: liked ? '#ef4444' : '#9ca3af',
              fontSize: 13,
              fontWeight: 600,
              transition: 'all 0.15s',
              opacity: loading ? 0.6 : 1,
            }}
          >
            <span style={{ fontSize: 15 }}>{liked ? '❤️' : '🤍'}</span>
            {likeCount}
          </button>
        </div>
      </div>

      {/* Review text */}
      <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.65, margin: 0 }}>{review.text}</p>
    </div>
  );
};

export default ReviewCard;
