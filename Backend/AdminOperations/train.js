const express= require('express');
const cors=require('cors');
const connectDB=require('./DB/connection');
const search_train=express();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const swaggerJsDoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express');
connectDB();

//swagger
const swaggerOptions={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Train API',
            description:'Train API information',
            contact:{
                name:''
            },
            servers:["http://localhost:3000"]
        }
    },
    apis:['train.js']
};

const swaggerDocs=swaggerJsDoc(swaggerOptions);
search_train.use('/train-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));

//const Train= require('./DB/trainData');
const trainData = require('./DB/trainData');

const trainClassData = require('./DB/classModel');
// admin data
const adminData= require('./DB/adminSchema');
const bodyParser=require('body-parser');
//search_train.use(express.json({extended : false}));
search_train.use(bodyParser.urlencoded({extended: false}));
search_train.use(bodyParser.json());
search_train.use(cors());
/*search_train.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});
*/

//Add admin

search_train.post('/admin',async(req,res)=>{
    try{
        let admin={};
        admin.name=req.body.name;
        admin.email=req.body.email;
        admin.password=req.body.password;

        let adminModel=new adminData(admin);
        await adminModel.save();

        let payload={subject: admin_id}
        let token=jwt.sign(payload,'secret');

        res.status(200).send({token});
        res.send(userModel);
    }
    catch(err){
        res.status(401).send(err);
    }
})

search_train.post('/admin/login',(req, res)=>{
    const email=req.body.email;
    const admin1={email: email, password:req.body.password}
    adminData.findOne({email: admin1.email}, (error, admin)=>{
        if(error){
            console.log(error);
        }
        else{
            if(!admin){
                res.status(401).send('Invalid email')
            }
            else{
                const auth=bcrypt.compare(admin1.password, admin.password)
                if(auth){
                    let payload={subject: admin._id}
                    let token=jwt.sign(payload, 'secret');
                    res.status(200).send({token})
                }
                else{
                    res.status(401).send('Invalid Password');
                }
            }
            
        }
    })
   
})
/**
 * @swagger
 * definitions:
 *  Train:
 *   type: object
 *   properties:
 *    trainNumber:
 *     type: Number
 *     description: Train Number
 *     example: 1800
 *    trainName:
 *     type: String
 *     description: Train Name
 *     example: 'Siddheshwar Express'
 *    source:
 *     type: String
 *     description: Source
 *     example: "CSMT"
 *    destination:
 *     type: String
 *     description: Destination
 *     example: "Solapur"
 *    vacantSeats:
 *     type: Number
 *     description: Vacant Seats
 *     example: 100 
 *    distance:
 *     type: Number
 *     description: Distance
 *     example: 400
 *    dTime:
 *     type: String
 *     description: Departure Time
 *     example: "9:30"
 *    aTime:
 *     type: String
 *     description: Arrival Time
 *     example: "20:30"
 */

 /**
  * @swagger
  * /addTrains/:
  *  post:
  *   summary: Add train
  *   description: Add train 
  *   requestBody:
  *    content:
  *     application/json: 
  *      schema:
  *       $ref: '#/definitions/Train'
  *   responses:
  *    200:
  *     description: Train added successfully
  *    400:
  *     description: error
  */
//Add Trains
search_train.post('/addTrains/',(req,res)=>{
   try{ const{trainNumber, trainName, source, destination, vacantSeats, distance, dTime, aTime}= req.body;

    let train={};
    train.trainNumber=trainNumber;
    train.trainName=trainName;
    train.source=source;
    train.destination=destination;
    train.vacantSeats=vacantSeats;
    train.distance=distance;
    train.dTime=dTime;
    train.aTime=aTime;
    let trainModel= new trainData(train);
    trainModel.save();

    res.status(200).json(trainModel);
}
 catch(err){
    res.status(404).send(err);
 }
})

/**
 * @swagger
 * definitions:
 *  TrainClass:
 *   type: object
 *   properties:
 *    classType:
 *     type: String
 *     description: Class Type
 *     example: "General"
 *    fare:
 *     type: Number
 *     description: Fare per KM
 *     example: 3
 */

 /**
  * @swagger
  * /trainClass/:
  *  post:
  *   summary: Add train Class Type
  *   description: Add train Class Type
  *   requestBody:
  *    content:
  *     application/json: 
  *      schema:
  *       $ref: '#/definitions/TrainClass'
  *   responses:
  *    200:
  *     description: Train Class added successfully
  *    400:
  *     description: error
  */
//Add Train Class
search_train.post('/trainClass/',async(req,res)=>{
    const{classType, fare}= req.body;

    let trainClass={};
    trainClass.classType=classType;
    trainClass.fare=fare;
       let classModel= new trainClassData(trainClass);
    await classModel.save();

    res.json(classModel);
})

search_train.get('/classType/:classType',async(req,res)=>{
    var queryParameters=req.params;
    var classType=queryParameters.classType;
    var getFare=function(classType){
        trainClassData.aggregate([
            {$match:{
                classType:classType
            }}
        ],
        function(err, result){
            if(err){
                console.log(err);
            }
            
                res.json(result);
            
        }
        );
    }
    getFare(classType);
})
/**
  * @swagger
  * /allTrains/:
  *  get:
  *   summary: List of all trains
  *   description: Get all trains 
  *   
  *   responses:
  *    200:
  *     description: Train List
  *    400:
  *     description: error
  */

//Get All trains
search_train.get('/allTrains/',(req,res)=>{
    
  
    var getAllTrains = function() {
        trainData.aggregate([
            { $match: {
                
            }}
            
        ], function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).send("error in to view Trains")
            }
        res.status(200).json(result);
            //res.status(200).send(result);
            
        });
    }
    
    getAllTrains();
   
    })




   
   //get trains by source and destination 

search_train.get('/trainList/:source/:destination',(req,res)=>{
    var queryParameters=req.params;
    var source1=queryParameters.source;
   var dest=queryParameters.destination;
    var getTrainList = function(source, destination) {
        trainData.aggregate([
            { $match: {
                source: source,
                destination: destination
            }}
            
        ], function (err, result) {
            if (err) {
                res.status(400);
                console.log(err);
                return;
            }
        res.status(200).json(result);
            //res.status(200).send(result);
            
        });
    }
    
    getTrainList(source1,dest);
   
    })


 
    // search train by train Name

    search_train.get('/train',(req,res)=>{
        var queryParameters=req.query;
        
      var trainName1=queryParameters.trainName;
        
        var getTrain = function(trainName) {
            trainData.aggregate([
                { $match: {
                    
                    trainName: trainName
                }}
                
            ], function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.json(result);
                
                
            });
        }
        
        getTrain(trainName1);
       
        })
    
//Update train details
    search_train.put('/updateTrain/:trainNumber',(req,res)=>{
        trainData.findOneAndUpdate({
            trainNumber:req.params.trainNumber
        },
        {
            $set:{trainNumber:req.params.trainNumber,source: req.body.source, destination: req.body.destination, vacantSeats:req.body.vacantSeats, trainName: req.body.trainName, distance: req.body.distance,dTime:req.body.dTime, aTime:req.body.aTime}
        },
        {upsert:true},
        function(err, newTrain){
            if(err){
                console.log('error occured');
               res.status(400);
            }else{
                console.log(newTrain);
                res.status(200);
                res.json(newTrain);
                console.log("Updated");
            }
        }
        );

    });
//Delete Train
    search_train.delete('/deleteTrain/:trainNumber', (req,res)=>{
         trainNumber=req.params.trainNumber;
        trainData.findOneAndDelete({
            trainNumber:req.params.trainNumber

        }).then(result =>{
            res.send("Deleted");
        })
        .catch(err => {
            console.log(err);
        })
        
    })





  

/*  
search_train.use('./controller/trainService',require('./controller/trainService'));
*/



search_train.listen(3000);

module.exports=search_train;