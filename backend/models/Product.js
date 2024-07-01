const mongoose =  require('mongoose');


const productSchema =  new mongoose.Schema({
       name : {
         type : String , 
         required: true 
       } ,
       description: {
        type : String , 
        required: true 
      },
      currency: {
        type : String , 
        required: true 
      } ,
      purchage_price : {
        type : Number , 
        required: true 
      } ,
      selling_price : {
        type : Number , 
        required: true 
      } ,
}, {
    timestamps : true 
});

const Product  =  mongoose.model('products' , productSchema);


module.exports  = {
     Product
}