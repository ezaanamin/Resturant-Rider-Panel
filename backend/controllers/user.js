import express from "express"
import User from "../model/users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
export const getUser = async (req, res) => {

    const client = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
      
    })   
    console.log(req.body)
    if(client)
    {
User.findOne({name:req.body.username}) .then(function(doc) {
    if(!doc)
    {
        
        res.send("Wrong username")
        
    }
    else
    {
     
        let p=req.body.password
        console.log(doc)
       console.log(p)
    
     let answer=bcrypt.compare(req.body.password,doc.password)
        let name=doc.name
        //console.log(answer) 
        if(answer)
        {
            const token = jwt.sign(
                { user_id: doc._id,name },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
              );
              res.json({"token":token,name:name,professional:"Amin Restaurant"})
        

        }
      
   
      

    }


 
})
    }




}