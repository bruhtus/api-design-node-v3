export const getOne = model => async (req, res) => {
  const id = req.params.id
  const userId = req.user._id

  //_id gonna be the same thing as the id parameters in item.router.js
  // how did we know if they're authenticated user? they created it, there's createdBy field in it
  const doc = await model.findOne({ _id: id, createdBy: userId }).exec()

  if (!doc) {
    return res.status(400).end()
  }

  res.status(200).json({ data: doc })
}

export const getMany = model => async (req, res) => {
  const docs = await model.find({ createdBy: req.user._id }).exec()
  res.status(200).json({ data: docs })
}

export const createOne = model => async (req, res) => {
  // create an object with a body, and then override the createdBy field to be whatever the authenticated user is
  const doc = await model.create({ ...req.body, createdBy: req.user._id })
  res.status(201).json({ data: doc })
}

export const updateOne = model => async (req, res) => {}

export const removeOne = model => async (req, res) => {}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
