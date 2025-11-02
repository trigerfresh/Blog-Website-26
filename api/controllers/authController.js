import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) return res.status(400).json({ msg: 'User already exists' })

  const user = await User.create({ username, email, password })
  res.json({ token: generateToken(user._id), user })
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !(await user.matchPassword(password)))
    return res.status(400).json({ msg: 'Invalid credentials' })
  res.json({ token: generateToken(user._id), user })
}
