const mongoose =  require('mongoose');

const inventorySchema = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    unit_type : {
        type: String , 
        enum: ['quantity' , 'weight' , 'litre'] ,
        required : true 
    } ,
    unit_value : {
        type: Number,
        required: true
    },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warehouse',
      required: true
    }
  } , {
    timestamps: true 
});
  
  const Inventory = mongoose.model('inventories', inventorySchema);
  
  module.exports ={ Inventory };
  