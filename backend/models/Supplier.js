const mongoose  =  require('mongoose');


const supplierSchema  =  new mongoose.Schema({
      name  : {
         type : String  , 
         required: true 
      } , 
      contact_info : {
         type : String  , 
         required: true 
      }
} , {
     timestamps: true 
});


const Supplier  =  mongoose.model('suppliers' , supplierSchema);

module.exports = {
     Supplier
}