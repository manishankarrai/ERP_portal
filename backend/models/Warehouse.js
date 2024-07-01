const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
} , {
    timestamps: true 
});

const Warehouse = mongoose.model('warehouses', warehouseSchema);

module.exports ={ Warehouse }
