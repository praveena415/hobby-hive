const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (userId) => jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '15m' });

exports.register = async (req,res,next) => {
  try {
    const { name, email, password } = req.body;
    if(!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const existing = await User.findOne({ email });
    if(existing) return res.status(400).json({ message: 'Email already used' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash: hash });
    const token = signToken(user._id);
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch(err){ next(err); }
};

exports.login = async (req,res,next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ message: 'Missing fields' });
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.passwordHash);
    if(!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = signToken(user._id);
    res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch(err){ next(err); }
};

exports.me = async (req,res,next) => {
  try {
    const user = req.user;
    res.json({ user });
  } catch(err){ next(err); }
};
