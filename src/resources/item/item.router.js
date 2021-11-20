import { Router } from 'express'

const router = Router()

const controller = (req, res) => {
  res.send({ message: 'hello world' })
}

router
  .route('/')
  .get(controller)
  .post(controller)

router
  .route('/:id')
  .get(controller)
  .put(controller)
  .delete(controller)

export default router
