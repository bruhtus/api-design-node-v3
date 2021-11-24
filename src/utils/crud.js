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

export const getMany = model => async (req, res) => {}

export const createOne = model => async (req, res) => {}

export const updateOne = model => async (req, res) => {}

export const removeOne = model => async (req, res) => {}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
