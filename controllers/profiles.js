import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

export async function index(req, res) {
  try {
    const profiles = await Profile.find({})
    res.json(profiles)
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}

export async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findById(req.params.id)

    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    profile.photo = image.url
    
    await profile.save()
    res.status(201).json(profile.photo)
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}

export async function show(req, res) {
  try {
    const profile = await Profile.findById(req.params.profileId)
    res.json(profile)
  } catch (err) {
    console.log(`🚨`, err)
    res.status(500).json(`🚨`, err)
  }
}
