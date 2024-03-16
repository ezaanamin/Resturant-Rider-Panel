import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema(
  {
    order_id: Number,
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer' // Reference to Customer collection
    },
    transaction_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TransactionType' // Reference to TransactionType collection
    },
    orders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product' // Reference to Product collection
    }],
    status: String,
    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rider' // Reference to Rider collection
    }
  },
  { timestamps: true }
);

const Orders = mongoose.model("Orders", OrdersSchema);
export default Orders;
