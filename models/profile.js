import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  pantryInventory: [{ type: Schema.Types.ObjectId, ref: 'PantryItem' }],
  shoppingList: [{ type: Schema.Types.ObjectId, ref: 'PantryItem' }],
  // shoppingCart: [{ type: Schema.Types.ObjectId, ref: 'PantryItem' }],
  repairs: [{ type: Schema.Types.ObjectId, ref: 'Repair' }],
  // --------- icebox ---------
  // budgets: [{ type: Schema.Types.ObjectId, ref: 'Budget' }], /* <--- for when we add categories to Budget model (also icebox) */
  // --------- icebox ---------
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
