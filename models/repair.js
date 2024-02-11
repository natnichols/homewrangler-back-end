import mongoose from 'mongoose'

const Schema = mongoose.Schema

const repairTaskSchema = new Schema({
  task: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    // default: false,
    // required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
}, {
  timestamps: true
})

const repairSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  priority: {
    type: String,
    required: true,
    enum: ['!', '!!', '!!!'],
  },
  description: {
    type: String,
  },
  repairTasks: [repairTaskSchema],
  // --------- icebox ---------
  // supplies: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'PantryItem'
  // },
  // cost: {
  //   type: Number,
  //   required: true
  // },
  // --------- icebox ---------
}, {
  timestamps: true
})

const Repair = mongoose.model('Repair', repairSchema)

export { Repair }