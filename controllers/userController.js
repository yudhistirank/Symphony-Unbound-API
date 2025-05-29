import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hash });
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: 'Invalid credentials' });

    const token = createToken(user);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const logout = (req, res) => {
  res.json({ message: 'Logged out (client-side token deletion expected)' });
};

export const addEnding = async (req, res) => {
  const { userId, endingNumber } = req.body;
  try {
    const update = {};
    update[`ending_${endingNumber}`] = true;
    await User.findByIdAndUpdate(userId, update);
    res.json({ message: `Ending ${endingNumber} unlocked` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getTrueEndings = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).select('ending_1 ending_2 ending_3');
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: 'User not found' });
  }
};

export const addButterfly = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { $inc: { butterfly: 1 } }, { new: true });
    res.json({ butterfly: user.butterfly });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
