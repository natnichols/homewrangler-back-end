import { PantryItem } from "../models/pantryItem.js"
import { Profile } from "../models/profile.js"

export async function create(req, res) {
  try {
    req.body.owner = req.user.profile
    const pantryItem = await PantryItem.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { pantryInventory: pantryItem } },
      { new: true }
    )
    pantryItem.owner = profile
    res.json(pantryItem)
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}

export async function index(req, res) {
  try {
    const pantryItems = await PantryItem.find({})
      .populate('owner')
      .sort({ createdAt: 'desc' })
    res.json(pantryItems)
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}

export async function show(req, res) {
  try {
    const pantryItem = await PantryItem.findById(req.params.pantryItemId)
      .populate('owner')
    res.json(pantryItem)
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}