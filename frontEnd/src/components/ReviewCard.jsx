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
  const userName = review.userId?.fullName || review.fullName || 'Anonymous';

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
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, color: '#9ca3af' }}>❤️ {review.likes?.length || 0}</span>
          </div>
        </div>
      </div>

      {/* Review text */}
      <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.65, margin: 0 }}>{review.text}</p>
    </div>
  );
};

export default ReviewCard;
