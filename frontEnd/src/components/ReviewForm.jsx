import { useForm } from 'react-hook-form';
import axios from 'axios';

const ReviewForm = ({ companyId, onReviewAdded }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      data.rating = parseInt(data.rating, 10);
      await axios.post(`/api/reviews/company/${companyId}`, data);
      reset();
      onReviewAdded();
    } catch (err) {
      console.error(err);
    }
  };

  const inputStyle = {
    width: '100%',
    border: '1.5px solid #d1d5db',
    borderRadius: 8,
    padding: '10px 14px',
    fontSize: 14,
    color: '#374151',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    background: '#fff',
  };
  const errStyle = { fontSize: 12, color: '#dc2626', marginTop: 4 };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {/* Name + Subject row */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 180px', minWidth: 180 }}>
          <input
            {...register('fullName', { required: 'Required' })}
            placeholder="Your full name"
            style={inputStyle}
          />
          {errors.fullName && <p style={errStyle}>{errors.fullName.message}</p>}
        </div>
        <div style={{ flex: '1 1 180px', minWidth: 180 }}>
          <input
            {...register('subject', { required: 'Required' })}
            placeholder="Review subject"
            style={inputStyle}
          />
          {errors.subject && <p style={errStyle}>{errors.subject.message}</p>}
        </div>
      </div>

      {/* Review text */}
      <div style={{ marginBottom: 16 }}>
        <textarea
          {...register('text', { required: 'Required' })}
          rows={4}
          placeholder="Write your review..."
          style={{ ...inputStyle, resize: 'none' }}
        />
        {errors.text && <p style={errStyle}>{errors.text.message}</p>}
      </div>

      {/* Rating row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>Rating:</span>
        <div style={{ display: 'flex', gap: 8 }}>
          {[1, 2, 3, 4, 5].map(r => (
            <label key={r} style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', fontSize: 14, color: '#374151' }}>
              <input
                type="radio"
                {...register('rating', { required: 'Select a rating' })}
                value={r}
                style={{ accentColor: '#7c3aed', width: 16, height: 16 }}
              />
              {r}★
            </label>
          ))}
        </div>
        {errors.rating && <p style={errStyle}>{errors.rating.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          background: isSubmitting ? '#a78bfa' : 'linear-gradient(135deg, #7c3aed, #6d28d9)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '12px 0',
          fontWeight: 700,
          fontSize: 15,
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit',
        }}
      >
        {isSubmitting ? 'Posting...' : '📝 Post Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
