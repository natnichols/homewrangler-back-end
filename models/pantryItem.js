import mongoose from 'mongoose'

const Schema = mongoose.Schema

const pantryItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Produce', 'Grocery', 'Fridge', 'Freezer', 'Health & Beauty', 'Household', 'Repairs'],
  },
  price: {
    type: Number,
    required: true
  },
  expires: {
    type: Boolean,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  // --------- icebox ---------
  // amountLeft: {
  //   type: String,
  //   required: true,
  //   enum: [],
  // },
  // expirationDate: {
  //   type: Date,
  // }
  // --------- icebox ---------
}, {
  timestamps: true
})

const PantryItem = mongoose.model('PantryItem', pantryItemSchema)

export { PantryItem }