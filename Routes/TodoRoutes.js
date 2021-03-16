const express = require('express');

const router = express.Router();

const {
  getAll,
  addItem,
  updatePurchaseStatus,
  deleteGroceryItem,
  updateItemVoice,
  deleteItemVoice,
} = require('../Controllers/TodoControllers');

router.post('/add', addItem);
router.get('/getAll', getAll);
router.put('/updatePurchaseStatus', updatePurchaseStatus);
router.put('/deleteGroceryItem', deleteGroceryItem);

router.post('/voice/updateItem', updateItemVoice);
router.post('/voice/deleteItem', deleteItemVoice);

module.exports = router;
