import Product from "../model/products.js";
import Orders from "../model/orders.js";
import multer from "multer"
import fs from "fs"
import express from "express"
import Customer from "../model/customers.js";
import mongoose from "mongoose"
import OrderNumber from "../OrderNumber/index.js"
import Transaction from "../model/transaction.js"
import OverallStats from "../model/OverallStats.js"
import { Sales } from "../model/sales.js"
import {ObjectId} from "mongoose"
import jwt from "jsonwebtoken"

    


    
       


export const GetProductStarters= async (req, res) => {




Product.find({cat:"Starters"}).then(function(doc) {


    if(!doc)
    {
      res.send("Unsucessful")   
    }
    else
    {
     

      
       res.json(doc)
    }


  })

}
export const GetProductBreakfast= async (req, res) => {




  Product.find({cat:"Breakfast"}).then(function(doc) {
  
  
      if(!doc)
      {
        res.send("Unsucessful")   
      }
      else
      {
       
  
        
         res.json(doc)
      }
  
  
    })
  
  }

  export const GetProductLunch= async (req, res) => {




    Product.find({cat:"Lunch"}).then(function(doc) {
    
    
        if(!doc)
        {
          res.send("Unsucessful")   
        }
        else
        {
         
    
          
           res.json(doc)
        }
    
    
      })
    
    }

    export const GetProductDinner= async (req, res) => {




      Product.find({cat:"Dinner"}).then(function(doc) {
      
      
          if(!doc)
          {
            res.send("Unsucessful")   
          }
          else
          {
           
      
            
             res.json(doc)
          }
      
      
        })
      
      }

      export const GetProductDessert= async (req, res) => {




        Product.find({cat:"Dessert"}).then(function(doc) {
        
        
            if(!doc)
            {
              res.send("Unsucessful")   
            }
            else
            {
             
        
              
               res.json(doc)
            }
        
        
          })
        
        }

        export const GetProductBeverage= async (req, res) => {




          Product.find({cat:"Beverage"}).then(function(doc) {
          
          
              if(!doc)
              {
                res.send("Unsucessful")   
              }
              else
              {
               
          
                
                 res.json(doc)
              }
          
          
            })
          
          }
          
export const GetOrderDetails= async (req, res) => {


 






  Orders.aggregate( [
    {
      $lookup:
        {
          from: "customers",
          localField: "customer_id",
          foreignField: "_id",
          as: "customers"
        },
       
   }
 ] ).then(function(doc) {
    if(doc)
    {
       res.json(doc)
    }
    else
    {n
        res.json("Error")
    }

 })






}
export const GetOrderProductDetails= async (req, res) => {
  let or=[]
  Orders.aggregate( [
    {
      $lookup:
        {
          from: "products",
          localField: "orders",
          foreignField: "_id",
          as: "products"
        },
        
     
    
       
   }
  ] ).then(function(doc) {
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
export const GetOrderID= async (req, res)=>{ 
  const Id = req.params.id;

  Product.findById(Id).then((function(docs){
    if(docs)
    {
     res.json(docs)
    }

}))
}
export const EditOrder=async (req,res)=>{
 const Id = req.params.id;
 var myquery = { _id: Id };
var val=0
   var newvalues ={ $set:{
           name: req.body.name,
          cat:req.body.cat,
         img: req.body.img,
         price:req.body.cost_price,
         cost_price:req.body.price,
      

        }
      }
    Product.updateOne(myquery, newvalues, function(err, res1) {

        if (err)
        {
        res.send("error")
        }
        else
        {
         res.send("sucessful")
        }
       
      });

}

export const DeleteOrder=async (req,res)=>{

  const Id = req.params.id;
  var myquery = { _id: Id };


  Product.deleteOne(myquery, function(err, obj) {
    if (err)
    {
      res.send(err)
    }
   
  else
  {
    res.send("Sucess")
  }


  })
}
export const GetCustomersOrder = async (req, res) => {

    const token = req.headers['authorization'];

    const headers = token.replace('Bearer ', ''); // Remove the "Bearer " prefix from the token

    const cleanedToken = headers.replace(/^"|"$/g, '');

    console.log(cleanedToken);
console.log(process.env.SERECT)
    const pay = jwt.verify(cleanedToken, process.env.SERECT);
    console.log(pay.user_id);

    const orders = await Orders.aggregate([
      {
        $match: { customer_id: new mongoose.Types.ObjectId(pay.user_id) },
      },
      {
        $unwind: {
          path: '$orders',
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'orders',
          foreignField: '_id',
          as: 'product',
        },
      },
    ]);

    if (orders) {
      console.log(orders);
      res.json(orders);
    } else {
      console.log('Error');
      res.status(404).json('Error');
    }
  
};



      
export const NewOrder=async (req,res)=>{

 var ids = req.body.menu.map(function(i) {
  return i.id;
});





const customer_id=req.body.customer_id 
var order=OrderNumber()
const order_number=[]
var result=false
Orders.find({}).then(function(doc)

{
  if(doc)
  {
    
   for(let i=0;i<doc.length;i++)
   {
   
    order_number.push(doc[i].order_id)
   }
  }
for(let i=0;i<order_number.length;i++)
{
  if(order==order_number[i])
  {
    result=true
  }
  else
  {


  }
}
if(result==true)
{
  order=OrderNumber()
}
var NewOrder = {

  order_id:order,
  customer_id:customer_id,
  orders:ids,
  status:"Pending"

};
var status;
console.log(req.body)
if(req.body.paymentMethod=="COD")
{
  status="Unpaid"

}
if(req.body.paymentMethod=="QuickPay")
{
  status="Paid"
}
var newtransactions={

  transaction_type:req.body.paymentMethod,
  order_id:order,
  customer_id:customer_id,
  total_amount:req.body.totalAmount,
  status:status

}
var go=0;
Orders.create(NewOrder).then((err,docs) => { 
  if (err){
   go==0

  }
  else
  {
   go==1

  }
})
Transaction.create(newtransactions).then((err,docs) => { 
  if (err){
  go==0
  }
  else
  {
   go==1

  }
})
const currentDate = new Date();
const newDailyData = {
  date: currentDate,
  totalSales: 1,
  totalUnits: 1,
};

for(let i=0;i<ids.length;i++)
{
 
Sales.findOneAndUpdate({productId: new mongoose.Types.ObjectId(ids[i])},{$push: { dailyData: newDailyData } }).then((err,docs) => { 
  if (err){
    go==0
    }
    else
    {
     go==1
  
    }



})



  

    
  
  }
  
  



res.json({"Order_Number":order})




})


}





  

    


    


