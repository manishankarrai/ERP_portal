const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
   
    transaction_type: {
        type: String,
        enum: ['sale', 'restock'],
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
    
    transaction_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    purchase_price: {
        type: Number,
        required: true
    }
} , {
     timestamps: true 
});

const Transaction = mongoose.model('transactions', transactionSchema);

module.exports = Transaction;
