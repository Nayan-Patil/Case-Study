let chai=require('chai');
let chaiHttp=require('chai-http');
const { response } = require('express');
let train_ticket=require("../bookingService");

//Assertion Style
chai.should();
chai.use(chaiHttp);
describe("Ticket API",()=>{

    // test to get Tickets
    describe("GET /viewTickets/:email",()=>{
        it("It should get all tickets",()=>{
           const email="ha@gmail.com";
            chai.request("http://localhost:5555")
                .get("/viewTickets/"+email)
               
                .end((err, response)=>{
                    response.should.have.status(200);
               
                })
        })
   
        
       })
       describe("GET /viewTicket/:email",()=>{
        it("It should not get all tickets",()=>{
           const email="ha@gmail.com";
            chai.request("http://localhost:5555")
                .get("/viewTicket/"+email)
               
                .end((err, response)=>{
                    response.should.have.status(404);
               
                })
        })
   
        
       })

       //Get trains by source and destination

       describe("GET /train/:source/:destination",()=>{
        it("It should get all tickets",()=>{
           const source="CSMT";
           const destination="Pune";
            chai.request("http://localhost:5555")
                .get("/train/"+source+"/"+destination)
               
                .end((err, response)=>{
                    response.should.have.status(200);
               
                })
        })
   
        
       })
  
  
    //test ticket booking operation

    describe("POST /bookTicket/",()=>{
        it("It should book new ticket",()=>{
            const ticket={
                email:"n@gmail.com",
                source:"CSMT",
                destination:"Pune",
                trainName:"Indrayni Express",
                classType:"A2", 
                noOfTickets:1,
                journeyDate:"22-12-2020"
            };
            chai.request("http://localhost:5555")
                .post("/bookTicket/")
                .send(ticket)
                .end((err,response)=>{
                    response.should.have.status(200);
                
                })
        })
    })
    describe("POST /bookTicke/",()=>{
        it("It should not book new ticket",()=>{
            const ticket={
                email:"n@gmail.com",
                source:"CSMT",
                destination:"Pune",
                trainName:"Indrayni Express",
                classType:"A2", 
                noOfTickets:1,
                journeyDate:"22-12-2020"
            };
            chai.request("http://localhost:5555")
                .post("/bookTicke/")
                .send(ticket)
                .end((err,response)=>{
                    response.should.have.status(404);
                
                })
        })
    })
    // delete ticket by PNR

    describe("DELETE /cancellation/:pnr",()=>{
        it("It should delete ticket",()=>{
           const pnr="1001A20";
            chai.request("http://localhost:5555")
                .delete("/cancellation/"+pnr)
               
                .end((err, response)=>{
                    response.should.have.status(200);
               
                })
        })
   
        
       })
       describe("DELETE /cancellatio/:pnr",()=>{
        it("It should not delete ticket",()=>{
           const pnr="1001A146";
            chai.request("http://localhost:5555")
                .delete("/cancellatio/"+pnr)
               
                .end((err, response)=>{
                    response.should.have.status(404);
               
                })
        })
   
        
       })
       // It shoul get fare of class Type
       describe("GET /fare/:classType",()=>{
        it("It should get fare ",()=>{
           const classType="A1";
            chai.request("http://localhost:5555")
                .get("/fare/"+classType)
               
                .end((err, response)=>{
                    response.should.have.status(200);
               
                })
        })
   
        
       })
         
})

