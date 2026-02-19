import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const AddCompany = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/companies', data);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to add company.');
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 48, textAlign: 'center', maxWidth: 400 }}>
          <p style={{ fontSize: 18, fontWeight: 600, color: '#374151' }}>🔒 Admin access required</p>
          <button onClick={() => navigate('/')} style={{ marginTop: 20, padding: '10px 24px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const inputStyle = {
    width: '100%',
    border: '1.5px solid #d1d5db',
    borderRadius: 8,
    padding: '10px 14px',
    fontSize: 14,
    color: '#374151',
    outline: 'none',
    fontFamily: 'inherit',
  };

  const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 };
  const errorStyle = { fontSize: 12, color: '#ef4444', marginTop: 4 };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '40px 16px' }}>
      <div style={{ maxWidth: 620, margin: '0 auto' }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 40, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111', marginBottom: 28 }}>Add New Company</h1>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={labelStyle}>Company Name *</label>
              <input {...register('name', { required: 'Name is required' })} placeholder="Enter company name" style={inputStyle} />
              {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>City *</label>
                <input {...register('city', { required: 'City is required' })} placeholder="e.g. Indore" style={inputStyle} />
                {errors.city && <p style={errorStyle}>{errors.city.message}</p>}
              </div>
              <div>
                <label style={labelStyle}>Founded On *</label>
                <input type="date" {...register('foundedOn', { required: 'Date is required' })} style={inputStyle} />
                {errors.foundedOn && <p style={errorStyle}>{errors.foundedOn.message}</p>}
              </div>
            </div>

            <div>
              <label style={labelStyle}>Address *</label>
              <textarea
                {...register('address', { required: 'Address is required' })}
                rows="3"
                placeholder="Full address"
                style={{ ...inputStyle, resize: 'none' }}
              />
              {errors.address && <p style={errorStyle}>{errors.address.message}</p>}
            </div>

            <div>
              <label style={labelStyle}>Description</label>
              <textarea
                {...register('description')}
                rows="3"
                placeholder="Short description (optional)"
                style={{ ...inputStyle, resize: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => navigate('/')}
                style={{ padding: '11px 24px', border: '1.5px solid #d1d5db', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: 'pointer', background: '#fff', color: '#374151' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '11px 28px',
                  background: isSubmitting ? '#a78bfa' : 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                }}
              >
                {isSubmitting ? 'Creating...' : '➕ Create Company'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
