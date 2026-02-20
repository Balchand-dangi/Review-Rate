import { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import CompanyCard from '../components/CompanyCard.jsx';

const PinIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth={2}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx={12} cy={9} r={2.5} />
  </svg>
);

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [companies, setCompanies] = useState([]);
  const [total, setTotal] = useState(0);
  const [city, setCity] = useState('Indore');
  const [sort, setSort] = useState('name');
  const [loading, setLoading] = useState(false);

  const abortRef = useRef(null);

  // Read search from URL (set by Navbar)
  const searchQuery = searchParams.get('search') || '';

  const fetchCompanies = useCallback(async (cityVal, sortVal, q) => {
    // Cancel any in-flight request
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    try {
      const cityParam = cityVal.split(',')[0].trim();
      const params = { city: cityParam, sort: sortVal };
      if (q) params.q = q;

      const res = await axios.get('/api/companies', {
        params,
        signal: abortRef.current.signal,
      });
      setCompanies(res.data.companies || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      if (axios.isCancel(err) || err.name === 'CanceledError') return;
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch when sort or search query changes
  useEffect(() => {
    fetchCompanies(city, sort, searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, searchQuery]);

  const handleFindCompany = () => {
    fetchCompanies(city, sort, searchQuery);
  };

  return (
    <>
      <style>{`
        .home-page { min-height: 100vh; background: #f9fafb; }
        .home-filter-bar { background: #fff; border-bottom: 1px solid #e5e7eb; padding: 14px 0; }
        .home-filter-inner {
          max-width: 1152px; margin: 0 auto;
          padding: 0 24px;
          display: flex; align-items: flex-end; gap: 14px; flex-wrap: wrap;
        }
        .home-city-group {
          display: flex; flex-direction: column; gap: 6px;
          flex: 1 1 220px; min-width: 180px;
        }
        .home-city-label { font-size: 12px; font-weight: 600; color: #6b7280; }
        .home-city-input-wrap { position: relative; display: flex; align-items: center; }
        .home-city-input {
          width: 100%;
          border: 1.5px solid #d1d5db; border-radius: 8px;
          padding: 10px 40px 10px 14px; font-size: 14px;
          color: #374151; outline: none; background: #fff;
          font-family: inherit; box-sizing: border-box;
          transition: border-color 0.15s;
        }
        .home-city-input:focus { border-color: #7c3aed; }
        .home-city-pin { position: absolute; right: 12px; display: flex; align-items: center; pointer-events: none; }
        .home-btn-primary {
          background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
          color: #fff; border: none; border-radius: 8px;
          padding: 11px 24px; font-weight: 700; font-size: 15px;
          cursor: pointer; font-family: inherit; white-space: nowrap; flex-shrink: 0;
          transition: opacity 0.15s;
        }
        .home-btn-primary:hover { opacity: 0.9; }
        .home-sort-group { display: flex; align-items: center; gap: 8px; margin-left: auto; }
        .home-sort-label { font-size: 13px; font-weight: 600; color: #6b7280; white-space: nowrap; }
        .home-sort-select {
          border: 1.5px solid #d1d5db; border-radius: 8px;
          padding: 10px 14px; font-size: 14px; color: #374151;
          background: #fff; cursor: pointer; font-family: inherit; outline: none;
        }
        .home-content { max-width: 1152px; margin: 0 auto; padding: 24px 24px; }
        .home-result-text { font-size: 13px; color: #6b7280; margin-bottom: 16px; }
        .home-list { display: flex; flex-direction: column; gap: 14px; }
        .home-empty { text-align: center; padding: 60px 20px; color: #9ca3af; font-size: 16px; }
        .home-skeleton {
          background: #fff; border: 1px solid #e5e7eb; border-radius: 12px;
          height: 100px; animation: home-pulse 1.4s ease infinite;
        }
        @keyframes home-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .home-search-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: #f5f3ff; border: 1px solid #ddd6fe;
          border-radius: 20px; padding: 4px 12px;
          font-size: 13px; color: #6d28d9; font-weight: 500;
          margin-bottom: 12px;
        }
        .home-search-badge button {
          background: none; border: none; cursor: pointer;
          color: #7c3aed; font-size: 15px; line-height: 1;
          padding: 0 2px; font-weight: 700;
        }

        @media (max-width: 600px) {
          .home-filter-inner { padding: 0 16px; gap: 10px; }
          .home-city-group { flex: 1 1 100%; max-width: 100%; min-width: 0; }
          .home-sort-group { margin-left: 0; width: 100%; justify-content: flex-start; }
          .home-btn-primary { flex: 1; text-align: center; }
          .home-content { padding: 16px; }
        }
      `}</style>

      <div className="home-page">
        {/* Filter Bar */}
        <div className="home-filter-bar">
          <div className="home-filter-inner">

            {/* City input */}
            <div className="home-city-group">
              <label className="home-city-label">Filter by City</label>
              <div className="home-city-input-wrap">
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleFindCompany()}
                  className="home-city-input"
                  placeholder="e.g. Indore"
                />
                <span className="home-city-pin"><PinIcon /></span>
              </div>
            </div>

            {/* Find Company */}
            <button className="home-btn-primary" onClick={handleFindCompany}>
              Find
            </button>

            {/* Add Company – admin only */}
            {user?.role === 'admin' && (
              <button className="home-btn-primary" onClick={() => navigate('/add-company')}>
                + Add Company
              </button>
            )}

            {/* Sort */}
            <div className="home-sort-group">
              <span className="home-sort-label">Sort:</span>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="home-sort-select"
              >
                <option value="name">Name</option>
                <option value="rating">Rating</option>
                <option value="reviews">Reviews</option>
              </select>
            </div>

          </div>
        </div>

        {/* Company List */}
        <div className="home-content">
          {/* Active search badge */}
          {searchQuery && (
            <div className="home-search-badge">
              🔍 Searching: "<strong>{searchQuery}</strong>"
              <button
                title="Clear search"
                onClick={() => {
                  const p = new URLSearchParams(searchParams);
                  p.delete('search');
                  setSearchParams(p);
                }}
              >
                ×
              </button>
            </div>
          )}

          <p className="home-result-text">
            {loading ? 'Loading...' : `${total} Result${total !== 1 ? 's' : ''} Found`}
          </p>

          {loading && (
            <div className="home-list">
              {[1, 2, 3].map(i => <div key={i} className="home-skeleton" />)}
            </div>
          )}

          {!loading && companies.length === 0 && (
            <div className="home-empty">
              No companies found. Try a different city or search term.
            </div>
          )}

          {!loading && companies.length > 0 && (
            <div className="home-list">
              {companies.map(company => (
                <CompanyCard key={company._id} company={company} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
