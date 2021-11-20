import { Router } from 'express'

const router = Router()

router
  .route('/')
  .get((req, res) => {
    res.send({ get: true })
  })
  .post((req, res) => {
    res.send({ post: true })
  })

router
  .route('/:id')
  .get((req, res) => {
    res.send({ get: true })
  })
  .put((req, res) => {
    res.send({ put: true })
  })
  .delete((req, res) => {
    res.send({ delete: true })
  })

export default router
