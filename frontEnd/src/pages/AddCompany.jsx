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
      <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '40px 32px', textAlign: 'center', maxWidth: 400, width: '100%' }}>
          <p style={{ fontSize: 18, fontWeight: 600, color: '#374151' }}>🔒 Admin access required</p>
          <button onClick={() => navigate('/')} style={{ marginTop: 20, padding: '10px 24px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const inputStyle = {
    width: '100%', border: '1.5px solid #d1d5db', borderRadius: 8,
    padding: '10px 14px', fontSize: 14, color: '#374151', outline: 'none',
    fontFamily: 'inherit', boxSizing: 'border-box', background: '#fff',
    transition: 'border-color 0.15s',
  };
  const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 };
  const errorStyle = { fontSize: 12, color: '#ef4444', marginTop: 4 };

  return (
    <>
      <style>{`
        .ac-page { min-height: 100vh; background: #f9fafb; padding: 40px 16px; }
        .ac-wrap { max-width: 620px; margin: 0 auto; }
        .ac-card {
          background: #fff; border: 1px solid #e5e7eb; border-radius: 14px;
          padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .ac-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .ac-actions { display: flex; gap: 12px; justify-content: flex-end; flex-wrap: wrap; }
        .ac-btn-cancel {
          padding: 11px 24px; border: 1.5px solid #d1d5db; border-radius: 8px;
          font-weight: 600; font-size: 14px; cursor: pointer;
          background: #fff; color: #374151; font-family: inherit;
          transition: background 0.15s;
        }
        .ac-btn-cancel:hover { background: #f9fafb; }
        .ac-btn-submit {
          padding: 11px 28px; color: #fff; border: none; border-radius: 8px;
          font-weight: 700; font-size: 14px; cursor: pointer; font-family: inherit;
          transition: opacity 0.15s;
        }
        .ac-btn-submit:hover:not(:disabled) { opacity: 0.9; }

        @media (max-width: 520px) {
          .ac-page { padding: 20px 12px; }
          .ac-card { padding: 24px 16px; }
          .ac-grid { grid-template-columns: 1fr; }
          .ac-actions { flex-direction: column-reverse; }
          .ac-btn-cancel, .ac-btn-submit { width: 100%; text-align: center; }
        }
      `}</style>

      <div className="ac-page">
        <div className="ac-wrap">
          <div className="ac-card">
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111', marginBottom: 28 }}>Add New Company</h1>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={labelStyle}>Company Name *</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  placeholder="Enter company name"
                  style={inputStyle}
                />
                {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
              </div>

              <div className="ac-grid">
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

              <div className="ac-actions">
                <button type="button" onClick={() => navigate('/')} className="ac-btn-cancel">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ac-btn-submit"
                  style={{ background: isSubmitting ? '#a78bfa' : 'linear-gradient(135deg, #7c3aed, #6d28d9)', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                >
                  {isSubmitting ? 'Creating...' : '➕ Create Company'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCompany;
