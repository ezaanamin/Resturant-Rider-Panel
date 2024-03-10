import mongoose from "mongoose";

const RiderSchema = new mongoose.Schema(
  {
    name:String,
    email:String,
    phone:Number,
    password:String,
    all_orders:{
      type:Number

    },
    delivered_order:{
      type:Number

    },
    pending_order:{
      type:Number,

    },
    rating:Number,
    




   

  },
  { timestamps: true }
);

const Rider = mongoose.model("Rider",RiderSchema);

export default Rider