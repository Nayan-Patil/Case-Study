let chai=require('chai');
let chaiHttp=require('chai-http');
const { response } = require('express');
let search_train=require("../train");

//Assertion Style
chai.should();
chai.use(chaiHttp);


describe('Admin Operation API',()=>{
 describe("POST /addTrains/",()=>{
     it("It should Post a new train",(done)=>{
         const train={
             trainNumber:5580,
             trainName:"Rajdhani Express",
             source:"Mumbai Central",
             destination:"New Delhi",
             dTime:"12:30",
             aTime:"19:20",
             distance:200,
             vacantSeats:200
         };
         chai.request("http://localhost:3000")
             .post("/addTrains/")
             .send(train)
             .end((err, response)=>{
                 response.should.have.status(200);
             done();
             })
     })

     
    })
    
    describe("POST /addTrain/",()=>{
        it("It should not Post a new train",(done)=>{
            const train={
                trainNumber:5558,
                trainName:"Rajdhani Express",
                source:"Mumbai Central",
                destination:"New Delhi",
                dTime:"12:30",
                aTime:"19:20",
                distance:200,
                vacantSeats:200
            };
            chai.request("http://localhost:3000")
                .post("/addTrain/")
                .send(train)
                .end((err, response)=>{
                    response.should.have.status(404);
                done();
                })
        })
   
        
       })
    //Put
    describe("PUT /updateTrain/:trainNumber",()=>{
        it("It should update a  train",()=>{
           const trainNumber=6669
            const train={
                trainNumber:6666,
                trainName:"Valsad Express",
                source:"Bandra",
                destination:"Valsad",
                dTime:"12:30",
                aTime:"23:20",
                distance:400,
                vacantSeats:120
            };
            chai.request("http://localhost:3000")
                .put("/updateTrain/"+trainNumber)
                .send(train)
                .end((err, response)=>{
                    response.should.have.status(200);
               
                })
        })
   
        
       })

       describe("PUT /updateTra/:trainNumber",()=>{
        it("It should not update a  train",()=>{
           const trainNumber=6667
            const train={
                trainNumber:6666,
                trainName:"Valsad Express",
                source:"Bandra",
                destination:"Valsad",
                dTime:"12:30",
                aTime:"23:20",
                distance:400,
                vacantSeats:120
            };
            chai.request("http://localhost:3000")
                .put("/updateTrai/"+trainNumber)
                .send(train)
                .end((err, response)=>{
                    response.should.have.status(404);
               
                })
        })
   
        
       })
       
       
       // get train by source and destination

       describe("GET /trainList/:source/:destination",()=>{
        it("It should get a  train by source and destination",()=>{
           const source="CSMT";
           const destination="Kolkata";
            
            chai.request("http://localhost:3000")
                .get("/trainList/"+source+'/'+destination)
               
                .end((err, response)=>{
                    response.should.have.status(200);
               
                })
        })
   
        
       })

       describe("GET /trainLis/:source/:destination",()=>{
        it("It should not get a  train by source and destination",()=>{
           const source="CSMT";
           const destination="Kolkata";
            
            chai.request("http://localhost:3000")
                .get("/trainLis/"+source+'/'+destination)
               
                .end((err, response)=>{
                    response.should.have.status(404);
               
                })
        })
   
        
       })

       //Delete train
       describe("DELETE /deleteTrain/:trainNumber",()=>{
        it("It should delete train",()=>{
           const trainNumber=66667;
            
            chai.request("http://localhost:3000")
                .delete("/deleteTrain/"+trainNumber)
               
                .end((err, response)=>{
                    response.should.have.status(200);
               
                })
        })
   
        
       })
  
     


     

})