import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    adminSecret: '',
  });
  const [showAdminField, setShowAdminField] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (field) => (e) =>
    setFormData(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = { ...formData };
      if (!showAdminField) delete payload.adminSecret;

      await axios.post('/api/auth/register', payload);
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed. Please try again.');
    }
  };

  const inputStyle = {
    width: '100%',
    border: '1.5px solid #d1d5db',
    borderRadius: 8,
    padding: '11px 14px',
    fontSize: 14,
    color: '#374151',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    marginBottom: 14,
    background: '#fff',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 40, width: '100%', maxWidth: 440, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{ width: 36, height: 36, background: '#7c3aed', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" fill="white" width={16} height={16}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: 20, color: '#111827' }}>
            Review<span style={{ color: '#7c3aed' }}>&amp;</span>RATE
          </span>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: '0 0 20px' }}>Create Account</h2>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#dc2626', marginBottom: 16 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" value={formData.fullName} onChange={handleChange('fullName')} style={inputStyle} required />
          <input type="email" placeholder="Email" value={formData.email} onChange={handleChange('email')} style={inputStyle} required />
          <input type="password" placeholder="Password (min 6 chars)" value={formData.password} onChange={handleChange('password')} style={inputStyle} minLength={6} required />

          {/* Admin secret toggle */}
          <div style={{ marginBottom: 14 }}>
            <button
              type="button"
              onClick={() => setShowAdminField(v => !v)}
              style={{ fontSize: 12, color: '#7c3aed', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit', textDecoration: 'underline' }}
            >
              {showAdminField ? '▲ Hide admin secret' : '▼ Register as admin? (enter secret key)'}
            </button>
          </div>

          {showAdminField && (
            <div style={{ marginBottom: 14 }}>
              <input
                type="password"
                placeholder="Admin secret key"
                value={formData.adminSecret}
                onChange={handleChange('adminSecret')}
                style={{ ...inputStyle, marginBottom: 4, borderColor: '#7c3aed' }}
              />
              <p style={{ fontSize: 11, color: '#9ca3af', margin: 0 }}>
                🔒 Only authorized personnel know this key. Incorrect key = regular user account.
              </p>
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 0',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              fontFamily: 'inherit',
              marginBottom: 16,
              marginTop: 4,
            }}
          >
            Sign Up
          </button>
        </form>

        {/* Role info box */}
        <div style={{ background: '#f5f3ff', border: '1px solid #e0d7ff', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 12, color: '#6d28d9' }}>
          <strong>Roles:</strong>
          <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
            <li><strong>User</strong> – can browse companies and write reviews</li>
            <li><strong>Admin</strong> – can also add new companies (requires secret key)</li>
          </ul>
        </div>

        <p style={{ fontSize: 13, color: '#6b7280', textAlign: 'center', margin: 0 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'none' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
