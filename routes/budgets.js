import { Router } from 'express'
import * as budgetsCtrl from '../controllers/budgets.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
// GET to localhost:3001/api/budgets
router.get('/', checkAuth, budgetsCtrl.index)
// GET to localhost:3001/api/budgets/:budgetId

// POST to localhost:3001/api/budgets
router.post('/', checkAuth, budgetsCtrl.create)
// PUT to localhost:3001/api/budgets/:budgetId

// DELETE to localhost:3001/api/budgets/:budgetId


export { router }