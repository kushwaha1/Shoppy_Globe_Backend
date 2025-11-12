import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from "../models/User.js"

const signToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h'
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ statusCode: 400, message: 'Name, email and password are required' });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ statusCode: 400, message: 'Invalid email format' });
    }

    if (password.length < 8) {
      return res.status(400).json({ statusCode: 400, message: 'Password must be at least 8 characters' });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ statusCode: 400, message: 'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({
      statusCode: 201,
      message: 'User registered successfully',
      data: { user: { id: user._id, name: user.name, email: user.email } }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ statusCode: 500, message: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ statusCode: 400, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ statusCode: 401, message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ statusCode: 401, message: 'Invalid credentials' });

    const token = signToken(user);
    res.status(200).json({
      statusCode: 200,
      message: 'Login successful',
      data: { token, id: user._id, name: user.name, email: user.email }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ statusCode: 500, message: 'Server error' });
  }
};
