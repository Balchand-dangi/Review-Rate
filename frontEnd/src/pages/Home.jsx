import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CompanyCard from '../components/CompanyCard.jsx';

const PinIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth={2}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx={12} cy={9} r={2.5} />
  </svg>
);

const S = {
  page: {
    minHeight: '100vh',
    background: '#f9fafb',
    fontFamily: 'inherit',
  },
  filterBar: {
    background: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    padding: '16px 0',
  },
  filterInner: {
    maxWidth: 1152,
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'flex-end',
    gap: 16,
    flexWrap: 'wrap',
  },
  cityGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    flex: '1 1 240px',
    minWidth: 220,
    maxWidth: 340,
  },
  cityLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: '#6b7280',
    lineHeight: 1,
  },
  cityInputWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  cityInput: {
    width: '100%',
    border: '1.5px solid #d1d5db',
    borderRadius: 8,
    padding: '10px 40px 10px 14px',
    fontSize: 14,
    color: '#374151',
    outline: 'none',
    background: '#fff',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  cityPin: {
    position: 'absolute',
    right: 12,
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: 8,
    padding: '11px 28px',
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  sortGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginLeft: 'auto',
  },
  sortLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: '#6b7280',
    whiteSpace: 'nowrap',
  },
  sortSelect: {
    border: '1.5px solid #d1d5db',
    borderRadius: 8,
    padding: '10px 14px',
    fontSize: 14,
    color: '#374151',
    background: '#fff',
    cursor: 'pointer',
    fontFamily: 'inherit',
    outline: 'none',
  },
  content: {
    maxWidth: 1152,
    margin: '0 auto',
    padding: '28px 24px',
  },
  resultText: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 16,
  },
  listWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#9ca3af',
    fontSize: 16,
  },
};

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [total, setTotal] = useState(0);
  const [city, setCity] = useState('Indore, Madhya Pradesh, India');
  const [sort, setSort] = useState('name');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompanies();
    // eslint-disable-next-line
  }, [sort]);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const cityParam = city.split(',')[0].trim();
      const res = await axios.get('/api/companies', {
        params: { city: cityParam, sort }
      });
      setCompanies(res.data.companies || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.page}>
      {/* Filter Bar */}
      <div style={S.filterBar}>
        <div style={S.filterInner}>

          {/* City input */}
          <div style={S.cityGroup}>
            <label style={S.cityLabel}>Select City</label>
            <div style={S.cityInputWrap}>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                style={S.cityInput}
              />
              <span style={S.cityPin}><PinIcon /></span>
            </div>
          </div>

          {/* Find Company */}
          <button style={S.btnPrimary} onClick={fetchCompanies}>
            Find Company
          </button>

          {/* Add Company – admin only */}
          {user?.role === 'admin' && (
            <button style={S.btnPrimary} onClick={() => navigate('/add-company')}>
              + Add Company
            </button>
          )}

          {/* Sort */}
          <div style={S.sortGroup}>
            <span style={S.sortLabel}>Sort:</span>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              style={S.sortSelect}
            >
              <option value="name">Name</option>
              <option value="rating">Rating</option>
              <option value="reviews">Reviews</option>
            </select>
          </div>

        </div>
      </div>

      {/* Company List */}
      <div style={S.content}>
        <p style={S.resultText}>Result Found: {total}</p>

        {loading && (
          <div style={S.emptyState}>Loading...</div>
        )}

        {!loading && companies.length === 0 && (
          <div style={S.emptyState}>
            No companies found. Try a different city or search term.
          </div>
        )}

        {!loading && companies.length > 0 && (
          <div style={S.listWrap}>
            {companies.map(company => (
              <CompanyCard key={company._id} company={company} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
