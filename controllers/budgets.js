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

async function deleteBudget(req, res) {
  try {
    const budget = await Budget.findByIdAndDelete(req.params.budgetId)
    res.json(budget)
    // --- below code throws error - mostly same as above but wanted to add barrier to keep anyone but the owner of the budget from being able to delete it. Also includes commented out line for an icebox feature ---
    // const budget = await Budget.findById(req.params.budgetId)
    // if (budget.owner.equals(req.user.profile)) {
    //   await Budget.findByIdAndDelete(req.params.budgetId)
    //   const profile = await Profile.findById(req.user.profile)
    //   // profile.budgets.remove({ _id: req.params.budgetId }) /* <--- icebox */
    //   await profile.save()
    //   res.json(budget)
    // } else {
    //   throw new Error('🛑🤠 Not authorized 😡❌')
    // }
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}

export {
  deleteBudget as delete
}