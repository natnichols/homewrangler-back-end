import mongoose from 'mongoose'

const Schema = mongoose.Schema

const repairTaskSchema = new Schema({

}, {
  timestamps: true
})

const repairSchema = new Schema({
  repairTasks: [repairTaskSchema]
}, {
  timestamps: true
})

const Repair = mongoose.model('Repair', repairSchema)

export { Repair }