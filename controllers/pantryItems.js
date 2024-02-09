import { PantryItem } from "../models/pantryItem"
import { Profile } from "../models/profile"

export async function create(req, res) {
  try {
    
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}