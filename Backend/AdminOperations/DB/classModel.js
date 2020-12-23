const mongoose=require('mongoose');




const Schema=mongoose.Schema;

const classSchema=new Schema({
    classType:{
        type:String,
        required:true
    },
    //Fare per KM
    fare:{
        type:Number,
        required:true
    }
});
const trainClass=module.exports=mongoose.model('TrainClass',classSchema);