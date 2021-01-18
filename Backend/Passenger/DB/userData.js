const mongoose= require('mongoose');
mongoose.set('useUnifiedTopology', true);
const bcrypt=require('bcryptjs');
const {isEmail}=require('validator');
const Schema= mongoose.Schema;

var userSchema=new Schema({
    
    email:{
        type:String,
        required:[true,'Enter an Email ID'],
        validate:[isEmail, 'enter a valid email']
        },
    
    password:{
        type: String,
       required: [true,'Enter password'],
       minlength:[6,'minimum length 6']
    },
    name:{
        type: String,
       required: [true,'Name is required']
    },
    age:{
        type: Number,
     required: [true,'Age is required']
    }
})

userSchema.pre('save', function(next){
    const salt=bcrypt.genSaltSync();
    this.password=bcrypt.hashSync(this.password, salt);
    next();
})


// static method to login user

userSchema.statics.login=function(email, password){
const user =  this.findOne({email:email});
if(user){
    const auth=bcrypt.compareSync(password, user.password);
    if(auth){
        return user;
    }
    throw Error ("Wrong password");
}
throw Error ("Wrong emmail Id");
}

module.exports = userData = mongoose.model('userDetails', userSchema);
