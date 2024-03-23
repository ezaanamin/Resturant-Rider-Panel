import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema(
  {

    order_id: Number,
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer' 
    },
    transaction_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TransactionType' 
    },
    orders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product' 
    }],
    status: String,
    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rider' 
    }
  },
  { strictPopulate: false, timestamps: true } 
);

const Orders = mongoose.model("Orders", OrdersSchema);
export default Orders;
