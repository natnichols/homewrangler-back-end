import { Repair } from "../models/repair.js"
import { Profile } from "../models/profile.js"

export async function create(req, res) {
  try {
    req.body.owner = req.user.Profile
    const repair = await Repair.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { repairs: repair } },
      { new: true }
    )
    repair.owner = profile
    res.json(repair)
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}

export async function index(req, res) {
  try {
    const repairs = await Repair.find({})
      .populate('owner')
      .sort({ priority: 'desc' })
    res.json(repairs)
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}

export async function show(req, res) {
  try {
    const repair = await Repair.findById(req.params.repairId)
      .populate(['owner', 'repairTasks.owner'])
    res.json(repair)
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}

export async function update(req, res) {
  try {
    const repair = await Repair.findByIdAndUpdate(
      req.params.repairId,
      req.body,
      { new: true }
    ).populate('owner')
    res.json(repair)
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}

async function deleteRepair(req, res) {
  try {
    const repair = await Repair.findByIdAndDelete(req.params.repairId)
    const profile = await Profile.findById(req.user.profile)
    profile.repairs.remove({ _id: req.params.repairId })
    await profile.save()
    res.json(repair)
    // --- below code throws error - same as above but wanted to add barrier to keep anyone but the owner of the repair from being able to delete it ---
    // const repair = await Repair.findById(req.params.repairId)
    // if (repair.owner.equals(req.user.profile)) {
    //   await Repair.findByIdAndDelete(req.params.repairId)
    //   const profile = await Profile.findById(req.user.profile)
    //   profile.repairs.remove({ _id: req.params.repairId })
    //   await profile.save()
    //   res.json(repair)
    // } else {
    //   throw new Error('🛑🤠 Not authorized 😡❌')
    // }
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}

export {
  deleteRepair as delete
}