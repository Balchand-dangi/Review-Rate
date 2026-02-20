import { useContext, useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const StarSVG = () => (
  <svg viewBox="0 0 24 24" fill="white" width={18} height={18}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const SearchSVG = () => (
  <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx={11} cy={11} r={8} /><path d="M21 21l-4.35-4.35" />
  </svg>
);

const MenuSVG = () => (
  <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <line x1={3} y1={6} x2={21} y2={6} /><line x1={3} y1={12} x2={21} y2={12} /><line x1={3} y1={18} x2={21} y2={18} />
  </svg>
);

const CloseSVG = () => (
  <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <line x1={18} y1={6} x2={6} y2={18} /><line x1={6} y1={6} x2={18} y2={18} />
  </svg>
);

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const dropdownRef = useRef(null);
  const debounceRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Sync search input if URL changes externally
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const doSearch = useCallback((value) => {
    const q = value.trim();
    const params = new URLSearchParams(searchParams);
    if (q) {
      params.set('search', q);
    } else {
      params.delete('search');
    }
    navigate(`/?${params.toString()}`);
  }, [navigate, searchParams]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    // debounce 350ms
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(value), 350);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      clearTimeout(debounceRef.current);
      doSearch(searchQuery);
      setMobileSearchOpen(false);
    }
    if (e.key === 'Escape') {
      setMobileSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <style>{`
        .nav-root {
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          z-index: 50;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .nav-inner {
          max-width: 1152px;
          margin: 0 auto;
          padding: 0 24px;
          height: 64px;
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nav-logo-circle {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: #7c3aed;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .nav-logo-text {
          font-weight: 800; font-size: 20px;
          color: #111827; letter-spacing: -0.5px;
        }
        .nav-logo-text span { color: #7c3aed; }
        .nav-search-wrap {
          flex: 1;
          max-width: 420px;
          position: relative;
        }
        .nav-search-input {
          width: 100%;
          border: 1.5px solid #d1d5db;
          border-radius: 8px;
          padding: 8px 40px 8px 14px;
          font-size: 14px;
          outline: none;
          color: #374151;
          background: #fff;
          font-family: inherit;
          box-sizing: border-box;
          transition: border-color 0.15s;
        }
        .nav-search-input:focus { border-color: #7c3aed; }
        .nav-search-icon {
          position: absolute; right: 12px; top: 50%;
          transform: translateY(-50%);
          color: #7c3aed; display: flex; pointer-events: none;
        }
        .nav-auth {
          margin-left: auto;
          display: flex; align-items: center; gap: 20px;
        }
        .nav-auth-link {
          font-weight: 600; font-size: 15px;
          color: #374151; text-decoration: none; cursor: pointer;
          white-space: nowrap;
        }
        .nav-auth-link:hover { color: #7c3aed; }
        .nav-user-btn {
          font-weight: 600; font-size: 15px;
          color: #374151; background: none; border: none;
          cursor: pointer; font-family: inherit; padding: 0; white-space: nowrap;
        }
        .nav-dropdown {
          position: absolute; right: 0; top: 110%;
          background: #fff; border: 1px solid #e5e7eb;
          border-radius: 10px; min-width: 170px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          z-index: 100; overflow: hidden;
        }
        .nav-dropdown-item {
          display: block; padding: 11px 16px;
          font-size: 14px; color: #374151;
          text-decoration: none; cursor: pointer;
          background: none; border: none;
          width: 100%; text-align: left;
          font-family: inherit;
          border-bottom: 1px solid #f3f4f6;
        }
        .nav-dropdown-item:hover { background: #f9fafb; }
        .nav-dropdown-item:last-child { border-bottom: none; }
        .nav-mobile-icon-btn {
          display: none;
          background: none; border: none;
          cursor: pointer; color: #374151;
          padding: 6px; border-radius: 6px;
        }
        .nav-mobile-icon-btn:hover { background: #f3f4f6; }

        /* Mobile search overlay */
        .mobile-search-overlay {
          display: none;
          position: fixed; top: 64px; left: 0; right: 0;
          background: #fff; border-bottom: 1px solid #e5e7eb;
          padding: 12px 16px; z-index: 49;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .mobile-search-overlay.open { display: flex; gap: 8px; }
        .mobile-search-overlay input {
          flex: 1;
          border: 1.5px solid #7c3aed; border-radius: 8px;
          padding: 9px 14px; font-size: 14px;
          outline: none; font-family: inherit;
        }

        /* Mobile menu */
        .mobile-menu {
          display: none;
          position: fixed; top: 64px; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.4); z-index: 48;
        }
        .mobile-menu.open { display: block; }
        .mobile-menu-panel {
          background: #fff;
          padding: 16px;
          display: flex; flex-direction: column; gap: 2px;
        }
        .mobile-menu-link {
          display: block; padding: 12px 16px;
          font-size: 15px; font-weight: 600;
          color: #374151; text-decoration: none;
          border-radius: 8px;
        }
        .mobile-menu-link:hover { background: #f3f4f6; }
        .mobile-menu-link.danger { color: #ef4444; }

        @media (max-width: 640px) {
          .nav-logo-text { font-size: 17px; }
          .nav-search-wrap { display: none; }
          .nav-auth { display: none; }
          .nav-mobile-icon-btn { display: flex; }
        }
      `}</style>

      <nav className="nav-root">
        <div className="nav-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <div className="nav-logo-circle">
              <StarSVG />
            </div>
            <span className="nav-logo-text">
              Review<span>&amp;</span>RATE
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="nav-search-wrap">
            <input
              type="text"
              placeholder="Search companies..."
              className="nav-search-input"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
            />
            <span  className="nav-search-icon"><SearchSVG /></span>
          </div>

          {/* Desktop Auth */}
          <div className="nav-auth">
            {!user ? (
              <>
                <Link to="/register" className="nav-auth-link">Sign Up</Link>
                <Link to="/login" className="nav-auth-link">Login</Link>
              </>
            ) : (
              <div style={{ position: 'relative' }} ref={dropdownRef}>
                <button className="nav-user-btn" onClick={() => setShowDropdown(v => !v)}>
                  {user.fullName} ▾
                </button>
                {showDropdown && (
                  <div className="nav-dropdown">
                    {user.role === 'admin' && (
                      <Link
                        to="/add-company"
                        className="nav-dropdown-item"
                        onClick={() => setShowDropdown(false)}
                      >
                        ➕ Add Company
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="nav-dropdown-item"
                      style={{ color: '#ef4444' }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile icons */}
          <button className="nav-mobile-icon-btn" onClick={() => { setMobileSearchOpen(v => !v); setMobileMenuOpen(false); }}>
            <SearchSVG />
          </button>
          <button style={{padding: '0 15px '}} className="nav-mobile-icon-btn" onClick={() => { setMobileMenuOpen(v => !v); setMobileSearchOpen(false); }}>
            {mobileMenuOpen ? <CloseSVG /> : <MenuSVG />}
          </button>
        </div>
      </nav>

      {/* Mobile search overlay */}
      <div className={`mobile-search-overlay${mobileSearchOpen ? ' open' : ''}`}>
        <input
          type="text"
          placeholder="Search companies..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
          autoFocus={mobileSearchOpen}
        />
        <button
          onClick={() => doSearch(searchQuery)}
          style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 16px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Search
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu${mobileMenuOpen ? ' open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setMobileMenuOpen(false); }}>
        <div className="mobile-menu-panel">
          {!user ? (
            <>
              <Link to="/register" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
              <Link to="/login" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Login</Link>
            </>
          ) : (
            <>
              <span style={{ padding: '8px 16px', fontSize: 13, color: '#6b7280', fontWeight: 600 }}>{user.fullName}</span>
              {user.role === 'admin' && (
                <Link to="/add-company" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>➕ Add Company</Link>
              )}
              <button className="mobile-menu-link danger" style={{ background: 'none', border: 'none', fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left' }} onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
