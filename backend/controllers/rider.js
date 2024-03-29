import Rider from "../model/rider.js"
import Orders from "../model/orders.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createClient } from 'redis';
import { io } from "../index.js";
export async function authorizeToken(authorizationHeader) {
  if (!authorizationHeader) {
    throw new Error('Not authorized');
  }

  const token = authorizationHeader.split(' ')[1].replace(/"/g, '');
  const token_key = process.env.TOKEN_KEY;

  return new Promise((resolve, reject) => {
    jwt.verify(token, token_key, (err, decoded) => {
      if (err) {
        reject(new Error('Token verification failed'));
      } else {
        resolve(decoded.id);
      }
    });
  });
}


export const GetRiders = async (req, res) => {
  Rider.find({}).then(function (doc) {
    if (!doc) {
      res.send("Unsucessful")
    }
    else { res.json(doc) }
  })
}

export const LoginRider = async (req, res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body;

    const doc = await Rider.findOne({ email: email });

    if (doc) {
      const match = await bcrypt.compare(password, doc.password);

      if (match) {
        const token = jwt.sign(
          { user_id: doc._id, name: doc.name },
          process.env.TOKEN_KEY,
          { expiresIn: "2h" }
        );
        console.log("Sucessul")
        return res.json({ token: token });
      } else {
        return res.json({ error: "Invalid password" });
      }
    } else {
      return res.json({ error: "Rider not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const RiderInformation = async (req, res) => {
  try {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
      return res.status(401).send('Not authorized');
    }

    const token = authorizationHeader.split(' ')[1].replace(/"/g, '');
    const token_key = process.env.TOKEN_KEY;

    jwt.verify(token, token_key, async (err, decoded) => {
      if (err) {
        return res.status(500).json({ error: "Token verification failed" });
      }

      try {
        const rider = await Rider.findById(decoded.user_id);
        if (!rider) {
          return res.status(404).json({ error: "Rider not found" });
        }

        const client = createClient();
        await client.connect();
        const cachedOrders = await client.get(rider.name);
        if (cachedOrders) {
          const orders = JSON.parse(cachedOrders); 
          return res.status(200).json({ rider, orders });
        }

        const orders = await Orders.find({ rider: rider._id }).populate("customer_id");
        // console.log(orders);

        await client.set(rider.name, JSON.stringify(orders));

        return res.status(200).json({ rider, orders });

      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


async function monitorNewOrder(userId) {
  const client = createClient();
  await client.connect();
  const changeStream = Orders.watch();


    changeStream.on('change', async (data) => {
      try {
        if (data.fullDocument && data.fullDocument.rider.equals(userId)) {
          const doc = await Orders.findById(data.documentKey._id);
          if (doc) {
           return doc;
          }
        }
      } catch (error) {
        reject(error);
      }
    });

}



export const NewOrdersDisplay = async (token,data) => {

  let user_id;
  const token_key = process.env.TOKEN_KEY;
let customer_information={};
let order_detail=[]
  jwt.verify(token,token_key,(error,decode)=>{

    if(decode)
    {

      user_id=decode.user_id
    }

  })
  try {

    if (user_id) {
      try {
        const fullDocument = await Orders.findOne({ _id: data.documentKey._id });
        if (fullDocument && fullDocument.rider.equals(user_id)) { 
          Orders.findById(data.documentKey._id)  .populate('customer_id')   .then((doc,err) => {
            if (doc) {
              customer_information['order_number']=doc.order_id;
              customer_information['customer_name']=doc.customer_id.name;
              customer_information['address']=doc.customer_id.address;
              customer_information['status']=doc.status
              order_detail.push(customer_information)
              console.log(order_detail)
              io.emit('new_order',order_detail);
            }
            if(err)
            {
              console.log(err)
            }
          });
        }
      } catch (error) {
        console.error('Error retrieving full document:', error);
      }

    } else {
      console.log("not login")
    }
  } catch (error) {
    console.error('Error in NewOrdersDisplay:', error);
  }
}

// changeStream.on('change', async (data) => {
//   try {
//     const fullDocument = await Orders.findOne({ _id: data.documentKey._id });
//     if (fullDocument && fullDocument.rider.equals(decoded.user_id)) {
//       const doc = await Orders.findById(data.documentKey._id);
//       if (doc) {
//         const cachedOrders = await client.get(decoded.name);
//         if (cachedOrders) {
//           let orders = JSON.parse(cachedOrders);
//           res.json({orders})
//           // const index = orders.findIndex(order => order.order_id === doc.order_id);
//           // if (index !== -1) {
//           //   orders.splice(index, 1); 
//           // }
          
//           // orders.push(doc);

//           // await client.set(decoded.name, JSON.stringify(orders)); 

//           // res.status(200).json({ orders });
//         }
//       }
//     }
//   } catch (error) {
//     console.error('Error retrieving full document:', error);
//   }
// });