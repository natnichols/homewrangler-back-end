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

export async function update(req, res) {
  try {
    const pantryItem = await PantryItem.findById(req.params.pantryItemId)
    if (pantryItem.owner.equals(req.user.profile)) {
      const updatedpantryItem = await PantryItem.findByIdAndUpdate(
        req.params.pantryItemId,
        req.body,
        { new: true }
      ).populate('owner')
      res.json(updatedpantryItem)
    } else {
      throw new Error('🛑🤠 Not authorized 😡❌')
    }
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}

async function deletePantryItem(req, res) {
  try {
    const pantryItem = await PantryItem.findById(req.params.pantryItemId)
    if (pantryItem.owner.equals(req.user.profile)) {
      await PantryItem.findByIdAndDelete(req.params.pantryItemId)
      const profile = await Profile.findById(req.user.profile)
      profile.pantryInventory.remove({ _id: req.params.pantryItemId })
      await profile.save()
      res.json(pantryItem)
    } else {
      throw new Error('🛑🤠 Not authorized 😡❌')
    }
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}

export {
  deletePantryItem as delete
}