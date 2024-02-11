import mongoose from 'mongoose'

const Schema = mongoose.Schema

const budgetSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
  },
  amount: {
    type: Number,
    required: true
  },
// --------- icebox ---------
  // category: {
  //   type: String,
  //   enum: ['Groceries', 'Utilities', 'Health & Beauty', 'Household', 'Repairs', 'Takeout', 'Car'], /* <---example categories */
  // }
// --------- icebox ---------
}, {
  timestamps: true
})

const Budget = mongoose.model('Budget', budgetSchema)

export { Budget }