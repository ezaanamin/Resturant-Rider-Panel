import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema(
  {
   order_id:Number,
  
   customer_id:mongoose.Schema.Types.ObjectId,  
   transaction_type:mongoose.Schema.Types.ObjectId,

   orders:[mongoose.Schema.Types.ObjectId],
   status:String,
   rider:mongoose.Schema.Types.ObjectId,



    

  },
  { timestamps: true }
);

const Orders = mongoose.model("Orders",  OrdersSchema);
export default Orders
