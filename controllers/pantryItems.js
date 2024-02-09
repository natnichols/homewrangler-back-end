import { PantryItem } from "../models/pantryItem.js"
import { Profile } from "../models/profile.js"

export async function create(req, res) {
  try {
    
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}