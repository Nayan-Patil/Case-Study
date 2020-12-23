const mongoose= require('mongoose');
mongoose.set('useUnifiedTopology', true);
const bcrypt=require('bcrypt');
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

userSchema.pre('save', async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password, salt);
    next();
})


// static method to login user

userSchema.statics.login=async function(email, password){
const user = await this.findOne({email:email});
if(user){
    const auth=bcrypt.compare(password, user.password);
    if(auth){
        return user;
    }
    throw Error ("Wrong password");
}
throw Error ("Wrong emmail Id");
}

module.exports = userData = mongoose.model('userDetails', userSchema);
