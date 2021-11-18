import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.disable('x-powered-by')

// CORS stands for Cross-Origin Resource Sharing
// CORS basically allows your API to be used by other domains
// that are on the browser
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// this is custom middleware
// `next` function will executes the next middleware after this function
// unless there's an error or a response before the `next` function executed
const log = (req, res, next) => {
  console.log('logging')
  // pass some data from middleware to other controllers
  req.mydata = 'hello'
  next()
}

app.get('/data', log, (req, res) => {
  res.send({ data: req.mydata })
})

app.post('/data', (req, res) => {
  console.log(req.body)
  res.send({ ok: true })
})

export const start = () => {
  app.listen(3000, () => {
    console.log('Server on port 3000')
  })
}
