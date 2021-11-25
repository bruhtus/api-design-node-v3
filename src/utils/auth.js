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
}

export const signin = async (req, res) => {}

export const protect = async (req, res, next) => {
  next()
}
