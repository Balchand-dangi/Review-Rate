
// review.routes.js
const express = require('express');
// Bug fix: import from corrected filename (removed triple-L typo)
const { addReview, getReviews, likeReview } = require('../controllers/review.controller');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Bug fix: changed from POST /:companyId to POST /company/:companyId
// to avoid route conflict with POST /:id/like
router.post('/company/:companyId', auth, addReview);
router.get('/company/:companyId', getReviews);
router.post('/:id/like', auth, likeReview);

module.exports = router;