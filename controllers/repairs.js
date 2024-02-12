import { Repair } from "../models/repair.js"
import { Profile } from "../models/profile.js"

export async function create(req, res) {
  try {
    req.body.owner = req.user.profile
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
    const repair = await Repair.findById(req.params.repairId)
    if (repair.owner.equals(req.user.profile)) {
      const updatedRepair = await Repair.findByIdAndUpdate(
        req.params.repairId,
        req.body,
        { new: true }
      ).populate('owner')
      await repair.save()
      res.json(updatedRepair)
    } else {
      throw new Error('🛑🤠 Not authorized 😡❌')
    }
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}

async function deleteRepair(req, res) {
  try {
    const repair = await Repair.findById(req.params.repairId)
    if (repair.owner.equals(req.user.profile)) {
      await Repair.findByIdAndDelete(req.params.repairId)
      const profile = await Profile.findById(req.user.profile)
      profile.repairs.remove({ _id: req.params.repairId })
      await profile.save()
      res.json(repair)
    } else {
      throw new Error('🛑🤠 Not authorized 😡❌')
    }
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}

export async function createRepairTask(req, res) {
  try {
    req.body.owner = req.user.profile
    const repair = await Repair.findById(req.params.repairId)
    repair.repairTasks.push(req.body)
    await repair.save()
    const newRepairTask = repair.repairTasks[repair.repairTasks.length - 1]
    const profile = await Profile.findById(req.user.profile)
    newRepairTask.owner = profile
    res.json(newRepairTask)
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}

export async function updateRepairTask(req, res) {
  try {
    const repair = await Repair.findById(req.params.repairId)
    const repairTask = repair.repairTasks.id(req.params.repairTaskId)
    if (repairTask.owner.equals(req.user.profile)) {
      repairTask.task = req.body.task
      repairTask.done = req.body.done
      req.body.done = !!req.body.done
      await repair.save()
      res.json(repair)
    } else {
      throw new Error('🛑🤠 Not authorized 😡❌')
    }

  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}

export async function deleteRepairTask(req, res) {
  try {
    const repair = await Repair.findById(req.params.repairId)
    repair.repairTasks.remove({ _id: req.params.repairTaskId })
    await repair.save()
    res.json(repair)
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}

export {
  deleteRepair as delete
}