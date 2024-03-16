import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import OrderRoutes from "./routes/orders.js"
import generalRoutes from "./routes/general.js"
import ItemsRoutes from "./routes/items.js"
import CustomersRoutes from "./routes/customers.js"
import UsersRoutes from "./routes/users.js"
import transactionRoutes from "./routes/transaction.js"
import mongoose from "mongoose"
import  bcrypt from "bcrypt"
import Product from "./model/products.js"
import multer from "multer"
import  Customer  from "./model/customers.js"
import transaction from "./model/transaction.js"
import Orders from "./model/orders.js"
import OverallStat from "./model/OverallStats.js"
import GeneralRoutes from "./routes/general.js"
import { Sales } from "./model/sales.js"
import Rider from "./model/rider.js"
import SalesRoutes from "./routes/sales.js"
import RIderRoutes from "./routes/riders.js"
import About from "./model/About.js"
import AboutRoutes from "./routes/About.js"
import Reviews from "./model/reviews.js"
import ReviewsRoutes from "./routes/reviews.js"
import PaymentRoutes from "./routes/payment.js"
import {data1} from "./data.js"
import {data2} from "./data2.js"
import CustomersReviews from "./model/CustomerReviews.js"
import http from "http"
import { Server } from 'socket.io';


dotenv.config();
const app=express()
const server=http.createServer(app)
app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/upload',express.static('upload'))
const { ObjectId } = mongoose.Types;

app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(cors())
app.get("/",(req,res)=>{
  res.json("hiii")
})
const currentYear = new Date().getFullYear()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/home/ezaan-amin/Documents/Programming/Profoilo/Resturant/Admin Panel/backend/upload/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  console.log(file)
  res.status(200).json(file.filename);
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use("/order",OrderRoutes);
app.use("/general",generalRoutes);
app.use("/items",ItemsRoutes);
app.use("/customers",CustomersRoutes);
app.use("/users",UsersRoutes)
app.use("/transaction",transactionRoutes )
app.use("/sales",SalesRoutes)
app.use("/riders",RIderRoutes)
app.use('/general',GeneralRoutes)
app.use('/about',AboutRoutes)
app.use('/review',ReviewsRoutes)
app.use('/payment',PaymentRoutes)

// transaction.create(data1)
// Orders.create(data1)

const io = new Server(server, {
  cors: {
    origin: process.env.BASE_URL, 
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

// const pipeline = [
//   {
//     $match: {
//       rider:  new mongoose.Types.ObjectId("65ec647ff92bff0309a05a1c")
//     },
//   },
// ];




const changeStream = Orders.watch();
changeStream.on('change', async (data) => {
  try {
    const fullDocument = await Orders.findOne({ _id: data.documentKey._id });
    if (fullDocument && fullDocument.rider.equals('65ec647ff92bff0309a05a1c')) {
      Orders.findById(data.documentKey._id).then((doc) => {
        if (doc) {
          console.log(doc);
        }
      });
    }
  } catch (error) {
    console.error('Error retrieving full document:', error);
  }
});


const PORT = process.env.PORT || 9000;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
    server.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
 
  export { io }; 