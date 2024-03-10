import  Customer from "../model/customers.js";
import Product from "../model/products.js";
import  bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"
export const GetCustomers = async (req, res) => {
    Customer.find({}).then(function(doc) {
    if(doc)
    {
      res.json(doc)
   
    }
    else
    {
      res.json("Error")
    }



    })
}
export const  CustomerOrder= async (req, res) => {
  Customer.findOne({}).then(function(doc) {
    if(doc)
    {
      var arr=doc.toObject();
  var id=arr.orders[0]

  Product.findById(id, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        console.log("Result : ", docs);
    }

  })

    }
    else
    {
        console.log("bye")
      
    }



    })

}

export const CalculateTotalAmount = async (req, res) => {

    Customer.findById('63f5b6931ec7e7122b340e1b').then(function(doc) {
        if(doc)
        {
  
         let total_amount=0;
          var arr=doc.toObject();
    
      for (let i = 0; i < arr.orders.length; i++) { 
    var id=arr.orders[i]
      Product.findById(id, function (err, docs) {
        if (err){
            res.json(err);
        }
        else{
            console.log("Result : ", docs);
            total_amount+=docs.price
         
        }
        console.log(total_amount)
      })
   

      }
    
  
        }
        else
        {
            console.log("bye")
          
        }
    
    
    
        })
    

}

async function comparePassword(password, hashedPassword) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
}

export const CustomersSignIn = async (req, res) => {


Customer.findOne({email:req.body.email}).then(function(doc) {


if(doc)
{

  let p=req.body
  console.log(doc.password)

  console.log(p)

  comparePassword(req.body.password, doc.password)
  .then((result) => {
    if (result) {

      const token = jwt.sign(
        { user_id: doc._id, },
        process.env.SERECT,
        {
          expiresIn: "2h",
        }
      );
      res.json({"token":token,customers:doc})
    
    } else {
 res.send("Wrong password")
    }
  })
  .catch((error) => {
    console.error('Error comparing passwords:', error);
  });
 





}
else
{
  res.send("Wrong email or password ")
}


})




}
export const CustomerGoogleSignIn = async (req, res) => {


Customer.findOne({email:req.body.information.email}).then(function(doc) {

    if(doc)
    {
    
  
      if(!doc.googleId)
      {
      
        
        var myquery = {email:req.body.information.email};
        var newvalues ={ $set:{
          googleId:req.body.information.sub
      
  
       }
     }
     Customer.updateOne(myquery,newvalues).then((doc, res1) => {

  
      if(!doc)
      {
      res.send("Wrong email or password ")
      }
      else
      {
        console.log(doc)
        const token = jwt.sign(
          { user_id: doc._id, },
          process.env.SERECT,
          {
            expiresIn: "2h",
          }
        );
         res.json({"token":token,customers:doc})
       
      }
     
    });
  
       
     
      }
  
      if(doc.googleId)
      {
     

        if(doc.googleId==req.body.information.sub)
        {
       console.log(doc)
          const token = jwt.sign(
            { user_id: doc._id, },
            process.env.SERECT,
            {
              expiresIn: "2h",
            }
          );
          res.json({"token":token,customers:doc})
        }
  
  
  
  
  
      }
    
    }
  
    if(!doc)
    {
      var newItem = {
        name:req.body.information.name,
        email:req.body.information.email,
        googleId:req.body.information.sub
  
  
     }; 
     
     //console.log(newItem)
     Customer.create(newItem).then(function(doc) {
       if (!doc){
         res.status(404).json("error");
       }
       else
       {
        const token = jwt.sign(
          { user_id: doc._id, },
          process.env.SERECT,
          {
            expiresIn: "2h",
          }
        );
        res.json({"token":token})
       }
     })
    }
  
  
  
  })


}


export const VerifyUser = async (req, res) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).send('Not authorized');
    }

    const cleanedToken = token.replace(/^Bearer\s+/i, '');

    const pay = jwt.verify(cleanedToken, process.env.TOKEN_KEY);

    console.log(pay.user_id);

    const doc = await Customer.findById(pay.user_id);

    if (doc) {
      console.log(doc);
      return res.send(doc);
    } else {
      return res.status(404).send('User not found');
    }
  } catch (e) {
    console.error(e);
    return res.status(401).send('Not authorized');
  }
};




export const NewCustomer = async (req, res) => {

  // console.log(req.body)

  Customer.findOne({email:req.body.email}).then(function(doc) {


    if(doc)
    {
      res.json("User exists")
    }
    if(!doc)
    {

      bcrypt.hash(req.body.password,10).then(hash=>{

        var newItem={
       email:req.body.email,
       password:hash,
       address:req.body.address,
       name:req.body.name,
       phone:req.body.phone
       
        }
        Customer.create(newItem).then(function(doc) {
          if (!doc){
            res.status(404).json("error");
          }
       else{
        res.status(200).json("sucessful")
       }


        })



    })



  }})




}
export const  updateCustomer= async (req, res) => {

const address=req.body.address
const phone=req.body.phone
const customer_id=req.body.customers_id
var myquery = { _id: customer_id };
var newvalues ={ $set:{
  address:address,
  phone:phone 



}
}
Customer.updateOne(myquery, newvalues).then((err, res1) => {

  if (!err)
  {
  res.send("error")
  }
  else
  {
console.log(err)

   res.send("sucessful")
  }
 
});


}