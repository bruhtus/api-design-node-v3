import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token => new Promise((resolve, reject) => {
  jwt.verify(token, config.secrets.jwt, (err, payload) => {
    if (err) return reject(err)
      resolve(payload)
  })
})

export const signup = async (req, res) => {
  // need to check if the input for email or password empty or not
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Email and Password required' })
  }

  try {
    const user = await User.create(req.body)
    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Email and Password required' })
  }

  const user = await User.findOne({ email: req.body.email }).exec()

  if (!user) {
    return res.status(401).send({ message: 'User Not Found' })
  }

  try {
    const match = await user.checkPassword( req.body.password )

    if (!match) {
      return res.status(401).send({ message: 'Wrong Password' })
    }

    const token = newToken(user)
    return res.status(201).send({ token })

  } catch (e) {
    console.error(e)
    return res.status(401).send({ message: 'Wrong Password' })
  }
}

export const protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end()
  }
}
