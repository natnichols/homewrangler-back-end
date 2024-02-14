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




//POSTMAN TESTING
// POST to localhost:3001/api/pantryItems/shoppingList/:pantryItemId/:profileId
// router.post('/shoppingList/:pantryItemId/:profileId',  pantryItemsCtrl.addToShoppingList)

// ACTUAL UI USAGE
// POST to localhost:3001/api/pantryItems/shoppingList/:pantryItemId
router.post('/shoppingList/:pantryItemId', checkAuth, pantryItemsCtrl.addToShoppingList)

//POSTMAN TESTING
// POST to localhost:3001/api/pantryItems/shoppingList/:pantryItemId/
// router.delete('/shoppingList/:pantryItemId/:profileId', pantryItemsCtrl.delFromShoppingList)

// ACTUAL UI USAGE
// POST to localhost:3001/api/pantryItems/shoppingList/:pantryItemId/
router.delete('/shoppingList/:pantryItemId', checkAuth, pantryItemsCtrl.delFromShoppingList)


export {
  router
}
