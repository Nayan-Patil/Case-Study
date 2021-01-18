const express= require('express');
const cors=require('cors');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const connectDB=require('./DB/connection');
const passengerRegister=express();
const handleErrors=(err)=>{
    console.log(err.message, err.code);
}

connectDB();

//const Train= require('./DB/trainData');
const userData = require('./DB/userData');
const bodyParser=require('body-parser');
//search_train.use(express.json({extended : false}));
passengerRegister.use(bodyParser.urlencoded({extended: false}));
passengerRegister.use(bodyParser.json());
passengerRegister.use(cors());
const maxAge=3*24*60*60;
const createToken= (id)=>{
    return jwt.sign({id},'SECRET', {
        expiresIn: maxAge
    })
}

/*passengerRegister.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});
*/

//User Registration

passengerRegister.post('/registration',(req,res)=>{
   
    const{email, password, name, age}= req.body;

    try{

    let user={};
    user.name=req.body.name;
    user.email=req.body.email;
    user.password=req.body.password;
   
    user.age=req.body.age;
    
    let userModel= new userData(user);
     userModel.save();
    let payload={subject : user._id}
    let token=jwt.sign(payload, 'secret');
   // res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000});

    res.status(200).send({token});
    res.send(userModel);
}
catch(err){
    handleErrors(err);
}
})

//User Login

passengerRegister.post('/login',(req, res)=>{
    const email=req.body.email;
    const user1={email: email, password:req.body.password}
    userData.findOne({email: user1.email}, (error, user)=>{
        if(error){
            console.log(error);
        }
        else{
            if(!user){
                res.status(401).send('Invalid email')
            }
            else{
                const age=user.age;
                const name=user.name;
                const auth=bcrypt.compareSync(user1.password, user.password)
                if(auth){
                    let payload={subject: user._id}
                    let token=jwt.sign(payload, 'secret');
                    res.status(200).send({token, email, name, age })
                    
                }
                else{
                    res.status(401).send('Invalid Password');
                }
            }
            
        }
    })
   
})





//passengerRegister.listen(8081);
module.exports=passengerRegister;