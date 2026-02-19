import { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const S = {
  nav: {
    background: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    position: 'sticky',
    top: 0,
    zIndex: 50,
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  inner: {
    maxWidth: 1152,
    margin: '0 auto',
    padding: '0 24px',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    gap: 24,
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    textDecoration: 'none',
    flexShrink: 0,
  },
  logoCircle: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    background: '#7c3aed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  logoText: {
    fontWeight: 800,
    fontSize: 20,
    color: '#111827',
    letterSpacing: '-0.5px',
  },
  searchWrap: {
    flex: 1,
    maxWidth: 420,
    position: 'relative',
  },
  searchInput: {
    width: '100%',
    border: '1.5px solid #d1d5db',
    borderRadius: 8,
    padding: '8px 40px 8px 14px',
    fontSize: 14,
    outline: 'none',
    color: '#374151',
    background: '#fff',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  searchIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#7c3aed',
    display: 'flex',
    pointerEvents: 'none',
  },
  authWrap: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: 24,
  },
  authLink: {
    fontWeight: 600,
    fontSize: 15,
    color: '#374151',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  userBtn: {
    fontWeight: 600,
    fontSize: 15,
    color: '#374151',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    padding: 0,
  },
  dropdown: {
    position: 'absolute',
    right: 0,
    top: '110%',
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: 10,
    minWidth: 170,
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    zIndex: 100,
    overflow: 'hidden',
  },
  dropdownItem: {
    display: 'block',
    padding: '11px 16px',
    fontSize: 14,
    color: '#374151',
    textDecoration: 'none',
    borderBottom: '1px solid #f3f4f6',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    fontFamily: 'inherit',
  },
};

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

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  return (
    <nav style={S.nav}>
      <div style={S.inner}>
        {/* Logo */}
        <Link to="/" style={S.logoWrap}>
          <div style={S.logoCircle}>
            <StarSVG />
          </div>
          <span style={S.logoText}>
            Review<span style={{ color: '#7c3aed' }}>&amp;</span>RATE
          </span>
        </Link>

        {/* Search */}
        <div style={S.searchWrap}>
          <input
            type="text"
            placeholder="Search..."
            style={S.searchInput}
          />
          <span style={S.searchIcon}><SearchSVG /></span>
        </div>

        {/* Auth */}
        <div style={S.authWrap}>
          {!user ? (
            <>
              <Link to="/register" style={S.authLink}>SignUp</Link>
              <Link to="/login" style={S.authLink}>Login</Link>
            </>
          ) : (
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <button style={S.userBtn} onClick={() => setShowDropdown(v => !v)}>
                {user.fullName} ▾
              </button>
              {showDropdown && (
                <div style={S.dropdown}>
                  {user.role === 'admin' && (
                    <Link
                      to="/add-company"
                      style={{ ...S.dropdownItem, borderBottom: '1px solid #f3f4f6' }}
                      onClick={() => setShowDropdown(false)}
                    >
                      ➕ Add Company
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    style={{ ...S.dropdownItem, color: '#ef4444', borderBottom: 'none' }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
