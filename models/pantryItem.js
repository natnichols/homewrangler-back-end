import mongoose from 'mongoose'

const Schema = mongoose.Schema

const pantryItemSchema = new Schema({

}, {
  timestamps: true
})

const PantryItem = mongoose.model('PantryItem', pantryItemSchema)

export { PantryItem }