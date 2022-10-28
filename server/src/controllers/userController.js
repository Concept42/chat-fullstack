const User = require('../models/userModel')
const bcrypt = require('bcrypt')

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const usernameCheck = await User.findOne({ username })
    if (usernameCheck) {
      return res.json({ msg: 'Username already used', status: false })
    }
    const emailCheck = await User.findOne({ email })
    if (emailCheck) {
      return res.json({ msg: 'Email already used', status: false })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      username,
      email,
      password: hashedPassword,
    })

    const newUser = await user.save()
    res.json(newUser)

    // delete user.password
  } catch (err) {
    next(err)
  }
}
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const loggedInUser = await User.findOne({ email })
    if (!loggedInUser) {
      return res.json({ msg: 'Incorrect email or password', status: false })
    }
    const isPasswordValid = await bcrypt.compare(password, loggedInUser.password)
    if (!isPasswordValid) {
      return res.json({ msg: 'Incorrect email or password', status: false })
    }
    return res.json(loggedInUser)
    // delete user.password
  } catch (err) {
    next(err)
  }
}

// module.exports.login = async (req, res) => {
//   {
//   }
//   const users = await User.find()
//   res.json(users)
// }
