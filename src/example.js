import { Item } from './resources/item/item.model'
import mongoose from 'mongoose'
import { connect } from './utils/db'

const run = async () => {
  await connect('mongodb://localhost:27017/api-test')

  const item = await Item.create({
    name: 'clean up',
    createdBy: mongoose.Types.ObjectId(),
    list: mongoose.Types.ObjectId(),
  })

  const updated = await Item.findOneAndUpdate(
    { name: 'clean up' },
    { name: 'typing' },
    { new: true }
  ).exec()

  console.log(updated)
}

run()
