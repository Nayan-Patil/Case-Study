const mongoose=require('mongoose');
const bcrypt=require('bcryptjs'); 
const {isEmail}=require('validator');
const Schema=mongoose.Schema;

const adminSchema=new Schema({
    name:{
        type:String,
        required:[true, 'enter a name']
    },
    email:{
        type:String,
        required:[true, "Enter an email ID"],
        validate:[isEmail, 'enter valid email address']
    },
    password:{
        type:String,
        required:[true, "Enter a password"],
        minlength:6
    }
});

adminSchema.pre('save', async function(next){
    const salt=await bcrypt.genSaltSync();
    this.password=await bcrypt.hashSync(this.password, salt);
    next();
})

adminSchema.statics.login=async function(email, password){
    const admin = await this.findOne({email:email});
    if(admin){
        const auth=bcrypt.compareSync(password, admin.password);
        if(auth){
            return admin;
        }
        throw Error ("Wrong password");
    }
    throw Error ("Wrong emmail Id");
    }
  
module.exports=adminData=mongoose.model("adminDetails",adminSchema);
