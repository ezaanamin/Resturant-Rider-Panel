import Reviews from "../model/reviews.js";
import CustomersReviews from "../model/CustomerReviews.js";
export const GetReviews= async (req, res) => {


    Reviews.find({}).then(function(doc) {
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

export const PostReviews= async (req, res) => {


  

  const name=req.body.name;
  const review=req.body.review;


  let data={
    name:name,
    review:review
  }

CustomersReviews.create(data).then((doc)=>{

  if(doc)
  {
    res.send("Sucess")
  }
  else
  {
    res.send("Error")
  }

})
}

