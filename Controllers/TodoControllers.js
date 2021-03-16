const e = require('express');
const asyncHandler = require('express-async-handler');
const { GroceryItem } = require('../Models/TodoModel');

//@desc Add  item
//@route /grocery/add
const addItem = asyncHandler(async (req, res) => {
  const { groceryItem, isPurchased } = req.body;
  const itemExists = await GroceryItem.findOne({ groceryItem });
  if (itemExists) {
    throw new Error('Item alredy exists');
  }
  const item = GroceryItem.create({
    groceryItem,
    isPurchased: isPurchased === true ? true : false,
  });

  if (item) {
    res.status(201);
    res.json({ result: 'success' });
  } else {
    res.status(401);
    throw new Error('Invalid data');
  }
});

//@desc get all items
//@route /grocery/getAll
const getAll = asyncHandler(async (req, res) => {
  const groceryItems = await GroceryItem.find({});
  res.json(groceryItems);
});

//@desc update isPurchased
//@route /grocery/updatePurchaseStatus
const updatePurchaseStatus = asyncHandler(async (req, res) => {
  const { id, isPurchased } = req.body;
  const item = await GroceryItem.findById(id);
  if (item) {
    item.isPurchased = isPurchased === true ? true : false;
    await item.save();
    res.status(200);
    res.json({ result: 'success' });
  } else {
    res.status(401);
    throw new Error('Grocery Item not Found');
  }
});

//@desc delete an  item
//@route /grocery/deleteGroceryItem
const deleteGroceryItem = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const item = await GroceryItem.findById(id);
  if (item) {
    await item.remove();
    res.status(200);
    res.json({ result: 'success' });
  } else {
    res.status(401);
    throw new Error('Grocery Item not Found');
  }
});

//@desc update item by voice
//@route /grocery/voice/updateItem
const updateItemVoice = asyncHandler(async (req, res) => {
  const name = {
    groceryItem: {
      $regex: req.body.name,
      $options: 'i',
    },
  };

  const letgo = req.query.letgo ? true : false;

  const item = await GroceryItem.find({ ...name });
  if (item) {
    if (letgo) {
      item[0].isPurchased = false;
    } else {
      item[0].isPurchased = true;
    }
    await item[0].save();
    res.status(200);
    res.json({ result: 'success' });
  } else {
    res.status(401);
    throw new Error('Grocery Item not Found');
  }
});
//@desc delete item by voice
//@route /grocery/voice/updateItem
const deleteItemVoice = asyncHandler(async (req, res) => {
  const name = {
    groceryItem: {
      $regex: req.body.name,
      $options: 'i',
    },
  };

  const item = await GroceryItem.find({ ...name });
  if (item) {
    item[0].remove();
    res.status(200);
    res.json({ result: 'success' });
  } else {
    res.status(401);
    throw new Error('Grocery Item not Found');
  }
});

module.exports = {
  addItem,
  getAll,
  updatePurchaseStatus,
  deleteGroceryItem,
  updateItemVoice,
  deleteItemVoice,
};
