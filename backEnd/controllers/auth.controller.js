const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password, fullName, adminSecret } = req.body;

    // RBAC: role is always 'user' by default.
    // Admin role is granted ONLY if the correct ADMIN_SECRET is provided.
    const role = (adminSecret && adminSecret === process.env.ADMIN_SECRET) ? 'admin' : 'user';

    const user = new User({ email, password, fullName, role });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, email, fullName, role } });
  } catch (err) {
    if (err.code === 11000) {    //MongoDB unique index error.
      return res.status(400).json({ msg: 'Email already registered. Please log in.' });
    }
    res.status(400).json({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ msg: 'Invalid email or password.' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email, fullName: user.fullName, role: user.role } });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
