const Company = require('../models/Company');

exports.addCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const { city, q, sort = 'name', page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const query = {};
    if (city) query.city = city;
    if (q) query.name = { $regex: q, $options: 'i' };

    const companies = await Company.find(query)
      .sort(sort === 'rating' ? { avgRating: -1 } : { [sort]: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Company.countDocuments(query);
    res.json({ companies, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ msg: 'Company not found' });
    res.json(company);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
