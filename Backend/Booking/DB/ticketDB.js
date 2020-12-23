const mongoose= require('mongoose');


const Schema= mongoose.Schema;

var ticketSchema=new Schema({
    
    email:{
        type:String,
        required:[true,'enter email']
        },
    
    
    source:{
        type: String,
        required:[true,'source']
    },
    destination:{
        type: String,
        required:[true,'Destination required']
    },
    trainNumber:{
        type: Number,
        required:[true,'Train Number required']
    },
    trainName:{
        type: String,
        required:[true,'Train Name required']
    },
    distance:{
        type:Number,
        required:[true,'Distance required']
    },
    
    classType:{
        type: String,
        required:[true,'Class Type']
    },
    noOfTickets:{
        type: Number,
     require: true
    },
    totalFare:{
        type:Number,
        require:true
    },
    pnr:{
        type:String,
        require:true,
        unique:true
    },
    journeyDate:{
        type:String
    },
    dTime:{
        type:String
    },
    aTime:{
        type:String
    }

})

module.exports = ticketData = mongoose.model('ticketDetails', ticketSchema);
