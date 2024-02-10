import { Router } from 'express'
import * as repairsCtrl from '../controllers/repairs.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
// GET to localhost:3001/api/repairs

// GET to localhost:3001/api/repairs/:repairId

// POST to localhost:3001/api/repairs
router.post('/', checkAuth, repairsCtrl.create)
// PUT to localhost:3001/api/repairs/:repairId

// DELETE to localhost:3001/api/repairs/:repairId


export { router }