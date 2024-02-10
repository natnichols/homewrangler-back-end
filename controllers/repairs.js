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