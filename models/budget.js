import mongoose from 'mongoose'

const Schema = mongoose.Schema

const budgetSchema = new Schema({

}, {
  timestamps: true
})

const Budget = mongoose.model('Budget', budgetSchema)

export { Budget }