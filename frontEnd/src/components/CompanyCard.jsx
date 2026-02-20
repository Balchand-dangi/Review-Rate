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
    <>
      <style>{`
        .cc-card {
          background: #fff; border: 1px solid #e5e7eb; border-radius: 12px;
          padding: 20px 24px;
          display: flex; flex-direction: row; align-items: center; gap: 20px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
          transition: box-shadow 0.18s;
        }
        .cc-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.10); }
        .cc-logo {
          width: 80px; height: 80px; min-width: 80px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; flex-shrink: 0;
        }
        .cc-info { flex: 1; min-width: 0; }
        .cc-name {
          font-size: 17px; font-weight: 700; color: #111827;
          margin: 0 0 4px; white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis;
        }
        .cc-address {
          font-size: 13px; color: #6b7280;
          margin: 0 0 10px;
          display: flex; align-items: center; gap: 4px;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .cc-rating-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .cc-stars { display: flex; gap: 2px; align-items: center; }
        .cc-right {
          display: flex; flex-direction: column;
          align-items: flex-end; justify-content: space-between;
          gap: 14px; min-width: 130px; align-self: stretch; flex-shrink: 0;
        }
        .cc-date { font-size: 12px; color: #9ca3af; white-space: nowrap; }
        .cc-btn {
          display: inline-block; background: #1f2937; color: #fff;
          padding: 9px 20px; border-radius: 8px; font-weight: 600;
          font-size: 14px; text-decoration: none; white-space: nowrap;
          text-align: center; transition: background 0.15s;
        }
        .cc-btn:hover { background: #374151; }

        @media (max-width: 520px) {
          .cc-card { flex-direction: column; align-items: flex-start; padding: 16px; gap: 12px; }
          .cc-logo { width: 56px; height: 56px; min-width: 56px; }
          .cc-right { flex-direction: row; min-width: 0; width: 100%; align-items: center; align-self: auto; }
          .cc-btn { flex: 1; text-align: center; }
          .cc-name { white-space: normal; }
        }
      `}</style>

      <div className="cc-card">
        {/* Logo */}
        <div className="cc-logo" style={{ background: getBgColor(company.name) }}>
          {company.logoUrl
            ? <img src={company.logoUrl} alt={company.name} style={{ width: 60, height: 60, objectFit: 'contain' }} />
            : <span style={{ color: '#fff', fontWeight: 800, fontSize: 22 }}>{getInitials(company.name)}</span>
          }
        </div>

        {/* Middle info */}
        <div className="cc-info">
          <h3 className="cc-name">{company.name}</h3>
          <p className="cc-address">
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} style={{ flexShrink: 0 }}>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx={12} cy={9} r={2.5} />
            </svg>
            {company.address}
          </p>
          <div className="cc-rating-row">
            <span style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{company.avgRating}</span>
            <div className="cc-stars">{renderStars(company.avgRating)}</div>
            {company.reviewCount > 0 && (
              <span style={{ fontSize: 13, color: '#6b7280' }}>{company.reviewCount} Reviews</span>
            )}
          </div>
        </div>

        {/* Right: date + button */}
        <div className="cc-right">
          {company.foundedOn && (
            <span className="cc-date">Founded {formatDate(company.foundedOn)}</span>
          )}
          <Link to={`/company/${company._id}`} className="cc-btn">
            Detail Review
          </Link>
        </div>
      </div>
    </>
  );
};

export default CompanyCard;
