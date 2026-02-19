
// company.routes.js
const express = require('express');
const { addCompany, getCompanies, getCompany } = require('../controllers/company.controller');
const { auth, admin } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, admin, addCompany);
router.get('/', getCompanies);
router.get('/:id', getCompany);

module.exports = router;
