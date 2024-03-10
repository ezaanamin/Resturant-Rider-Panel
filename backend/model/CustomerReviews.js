import mongoose from "mongoose";

const CustomersReviewsSchema = new mongoose.Schema(
  {
    name:String,
    review:String,

    


   

  },
  { timestamps: true }
);

const CustomersReviews = mongoose.model("Customers Reviews", CustomersReviewsSchema);

export default CustomersReviews