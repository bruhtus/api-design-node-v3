import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  status: {
    type: String,
    required: true,
    default: 'active',
    // enum is a validator that checks if the value is in the given array
    enum: ['active', 'complete', 'pastdue'],
  },
  notes: String,
  due: Date,
  createdBy: {
    type: mongoose.ObjectId,
    // or type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'user',
  },
  list: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'list',
  },
}, { timestamps: true })
export const Item = mongoose.model('item', itemSchema)
