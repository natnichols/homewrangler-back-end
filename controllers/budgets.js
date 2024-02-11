import { Budget } from "../models/budget.js"
import { Profile } from "../models/profile.js"

export async function create(req, res) {
  try {
    req.body.owner = req.user.profile
    const budget = await Budget.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      // { $push: { budgets: budget } }, /* <--- icebox */
      { new: true }
    )
    budget.owner = profile
    res.json(budget)
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}