const mongoose= require('mongoose');

const URI="mongodb+srv://Nayan:Nayan@cluster0.qda8b.mongodb.net/Ticket_Data?retryWrites=true&w=majority";

mongoose.set('useUnifiedTopology', true);
const connectDB= async()=>{
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser:true
    });
};

module.exports = connectDB;