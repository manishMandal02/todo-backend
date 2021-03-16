const mongoose = require('mongoose');

const groceryItemSchema = mongoose.Schema({
  groceryItem: {
    type: String,
    required: true,
  },
  isPurchased: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const GroceryItem = mongoose.model('GroceryItem', groceryItemSchema);

module.exports = { GroceryItem };
