const mongoose =  require('mongoose');


const userSchema =  new mongoose.Schema({
      name : {
        type : String ,
        require : true 
      } , 
      email : {
         type : String  , 
         required: true , 
         unique : true 
      } , 
      password : {
         type: String , 
         required: true 
      } ,
      role : {
          type: String  , 
          enum: ['admin' , 'manager' , 'employee'] , 
          default : 'employee' 
      } ,
      isDeleted : {
          type : Boolean , 
          default: false 
      }
} , { 
    timestamps : true 
});

userSchema.pre('find' , function(){
     this.where({isDeleted : false });
     this.select('-password -isDeleted');
});

userSchema.pre('findOne' , function(){
     this.where({isDeleted : false });
 //    this.select(' -isDeleted');
});



userSchema.methods.hasRole = function(role) {
    return this.role === role;
  };

const User  =  mongoose.model('users' , userSchema);

module.exports  = { User  } ;