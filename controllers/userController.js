const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await User.create({ ...req.body, password: hashedPassword })
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
    res.json({ token })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
