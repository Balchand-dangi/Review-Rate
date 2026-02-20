import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', border: '1.5px solid #d1d5db', borderRadius: 8,
    padding: '11px 14px', fontSize: 14, color: '#374151', outline: 'none',
    fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: 16,
    background: '#fff', transition: 'border-color 0.15s',
  };

  return (
    <>
      <style>{`
        .auth-page {
          min-height: 100vh; background: #f9fafb;
          display: flex; align-items: center; justify-content: center; padding: 24px;
        }
        .auth-card {
          background: #fff; border: 1px solid #e5e7eb; border-radius: 14px;
          padding: 40px; width: 100%; max-width: 420px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        @media (max-width: 480px) {
          .auth-page { padding: 16px; align-items: flex-start; padding-top: 40px; }
          .auth-card { padding: 28px 20px; }
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-card">
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <div style={{ width: 36, height: 36, background: '#7c3aed', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" fill="white" width={16} height={16}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            </div>
            <span style={{ fontWeight: 800, fontSize: 20, color: '#111827' }}>Review<span style={{ color: '#7c3aed' }}>&amp;</span>RATE</span>
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: '0 0 20px' }}>Welcome Back</h2>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#dc2626', marginBottom: 16 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="email" placeholder="Email"
              value={email} onChange={e => setEmail(e.target.value)}
              style={inputStyle} required
            />
            <input
              type="password" placeholder="Password"
              value={password} onChange={e => setPassword(e.target.value)}
              style={inputStyle} required
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? '#a78bfa' : 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                color: '#fff', border: 'none', borderRadius: 8,
                padding: '12px 0', fontWeight: 700, fontSize: 15,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit', marginBottom: 16,
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p style={{ fontSize: 13, color: '#6b7280', textAlign: 'center', margin: 0 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'none' }}>Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
