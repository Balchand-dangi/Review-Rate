import { Link } from 'react-router-dom';

/* ---------- Star rendering ---------- */
const StarFilled = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="#f59e0b" style={{ display: 'block' }}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const StarHalf = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" style={{ display: 'block' }}>
    <defs>
      <linearGradient id="hg">
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="50%" stopColor="#d1d5db" />
      </linearGradient>
    </defs>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#hg)" />
  </svg>
);
const StarEmpty = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="#d1d5db" style={{ display: 'block' }}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const renderStars = (rating) =>
  [1, 2, 3, 4, 5].map(i => {
    if (rating >= i) return <StarFilled key={i} />;
    if (rating >= i - 0.5) return <StarHalf key={i} />;
    return <StarEmpty key={i} />;
  });

/* ---------- Helpers ---------- */
const LOGO_COLORS = ['#1e1b4b', '#14532d', '#7c2d12', '#3b0764', '#0c4a6e', '#064e3b'];
const getBgColor = (name = '') => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return LOGO_COLORS[Math.abs(h) % LOGO_COLORS.length];
};
const getInitials = (name = '') =>
  name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

const formatDate = (d) => {
  if (!d) return '';
  const dt = new Date(d);
  const dd = String(dt.getDate()).padStart(2, '0');
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  const yy = dt.getFullYear();
  return `${dd}-${mm}-${yy}`;
};

/* ---------- Component ---------- */
const CompanyCard = ({ company }) => {
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.18s',
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.10)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'}
    >
      {/* Logo square */}
      <div
        style={{
          width: 80,
          height: 80,
          minWidth: 80,
          background: getBgColor(company.name),
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {company.logoUrl
          ? <img src={company.logoUrl} alt={company.name} style={{ width: 60, height: 60, objectFit: 'contain' }} />
          : <span style={{ color: '#fff', fontWeight: 800, fontSize: 22 }}>{getInitials(company.name)}</span>
        }
      </div>

      {/* Middle info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#111827', margin: 0, marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {company.name}
        </h3>
        <p style={{ fontSize: 13, color: '#6b7280', margin: 0, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2}>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx={12} cy={9} r={2.5} />
          </svg>
          {company.address}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{company.avgRating}</span>
          <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {renderStars(company.avgRating)}
          </div>
          {company.reviewCount > 0 && (
            <span style={{ fontSize: 13, color: '#6b7280' }}>{company.reviewCount} Reviews</span>
          )}
        </div>
      </div>

      {/* Right: date + button */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', gap: 14, minWidth: 140, alignSelf: 'stretch' }}>
        {company.foundedOn && (
          <span style={{ fontSize: 12, color: '#9ca3af', whiteSpace: 'nowrap' }}>
            Founded on {formatDate(company.foundedOn)}
          </span>
        )}
        <Link
          to={`/company/${company._id}`}
          style={{
            display: 'inline-block',
            background: '#1f2937',
            color: '#ffffff',
            padding: '9px 20px',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 14,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#374151'}
          onMouseLeave={e => e.currentTarget.style.background = '#1f2937'}
        >
          Detail Review
        </Link>
      </div>
    </div>
  );
};

export default CompanyCard;
