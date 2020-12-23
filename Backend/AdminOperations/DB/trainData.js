const mongoose= require('mongoose');


const Schema= mongoose.Schema;

var trainSchema=new Schema({
    
    trainNumber:{
        type:Number,
        required:[true,'enter train number'],
        unique: true
        },
    
    trainName:{
        type: String,
        required:[true,'enter train name'],
        unique: true
    },
    source:{
        type: String,
        required:[true,'enter source'],
    },
    destination:{
        type: String,
        required:[true,'enter destination'],
    },
    vacantSeats:{
        type: Number,
        required:[true,'enter vacant seats'],
    },
    distance:{
        type:Number,
        required:[true,'enter distance'],
    },
    dTime:{
        type:String
    },
    aTime:{
        type:String
    }

})

module.exports = trainData = mongoose.model('trainDetails', trainSchema);
