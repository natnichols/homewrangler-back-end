import { PantryItem } from "../models/pantryItem.js"
import { Profile } from "../models/profile.js"

export async function create(req, res) {
  try {
    req.body.owner = req.user.profile
    const pantryItem = await PantryItem.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile
    )
    pantryItem.owner = profile
    res.json(pantryItem)
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}