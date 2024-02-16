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
// POST to localhost:3001/api/pantryItems/shoppingList/:pantryItemId
router.post('/shoppingList/add/:pantryItemId', checkAuth, pantryItemsCtrl.addToShoppingList)
// POST to localhost:3001/api/pantryItems/shoppingList/:pantryItemId/
router.delete('/shoppingList/remove/:pantryItemId', checkAuth, pantryItemsCtrl.delFromShoppingList)
// PUT to localhost:3001/api/pantryItems/:pantryItemId
router.put('/:pantryItemId', checkAuth, pantryItemsCtrl.update)
// DELETE to localhost:3001/api/pantryItems/:pantryItemId
router.delete('/:pantryItemId', checkAuth, pantryItemsCtrl.delete)

export {
  router
}
