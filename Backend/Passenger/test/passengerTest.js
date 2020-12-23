let chai=require('chai');
let chaiHttp=require('chai-http');
const { response } = require('express');
let passengerRegister=require("../userService");

//Assertion Style
chai.should();
chai.use(chaiHttp);


describe('User API',()=>{
 describe("POST /registration",()=>{
     it("It should Post a new passenger",()=>{
         const user={
             name:"Pratik",
             email:"pratik@gmail.com",
             password:"123456",
             age:20
         };
         chai.request("http://localhost:8081")
             .post("/registration")
             .send(user)
             .end((err, response)=>{
                 response.should.have.status(200);
            
             })
     })

     
    })
    
      
})