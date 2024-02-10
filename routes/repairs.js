import { Router } from 'express'
import * as repairsCtrl from '../controllers/repairs.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
// GET to localhost:3001/api/repairs
router.get('/', checkAuth, repairsCtrl.index)
// GET to localhost:3001/api/repairs/:repairId
router.get('/:repairId', checkAuth, repairsCtrl.show)
// POST to localhost:3001/api/repairs
router.post('/', checkAuth, repairsCtrl.create)
// PUT to localhost:3001/api/repairs/:repairId
router.put('/:repairId', checkAuth, repairsCtrl.update)
// DELETE to localhost:3001/api/repairs/:repairId


export { router }