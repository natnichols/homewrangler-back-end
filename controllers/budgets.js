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

export async function index(req, res) {
  try {
    const budgets = await Budget.find({})
      .populate('owner')
      .sort({ createdAt: 'desc' })
    res.json(budgets)
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}

export async function show(req, res) {
  try {
    const budget = await Budget.findById(req.params.budgetId)
      .populate('owner')
    res.json(budget)
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}

export async function update(req, res) {
  try {
    const budget = await Budget.findByIdAndUpdate(
      req.params.budgetId,
      req.body,
      { new: true }
    ).populate('owner')
    res.json(budget)
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}

export {

}