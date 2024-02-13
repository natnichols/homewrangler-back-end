import { Router } from 'express'
import * as pantryItemsCtrl from '../controllers/pantryItems.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
// GET to localhost:3001/api/pantryItems
router.get('/', checkAuth, pantryItemsCtrl.index)
// GET to localhost:3001/api/pantryItems/:pantryItemId
router.get('/:pantryItemId', checkAuth, pantryItemsCtrl.show)
// POST to localhost:3001/api/pantryItems
router.post('/', checkAuth, pantryItemsCtrl.create)
// PUT to localhost:3001/api/pantryItems/:pantryItemId
router.put('/:pantryItemId', checkAuth, pantryItemsCtrl.update)
// DELETE to localhost:3001/api/pantryItems/:pantryItemId
router.delete('/:pantryItemId', checkAuth, pantryItemsCtrl.delete)

// POST to localhost:3001/api/pantryItems
router.post('/', checkAuth, pantryItemsCtrl.addToShoppingList)

export {
  router
}
