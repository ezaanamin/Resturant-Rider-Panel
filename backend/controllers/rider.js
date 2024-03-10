import Rider from "../model/rider.js"
import Orders from "../model/orders.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createClient } from 'redis';

export const GetRiders = async (req, res) => {
    Rider.find({}).then(function (doc) {
        if (!doc) {
            res.send("Unsucessful")
        }
        else {res.json(doc)}
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


    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {

      return res.status(401).send('Not authorized');
    }

    const token = authorizationHeader.split(' ')[1].replace(/"/g, '');

    const token_key=process.env.TOKEN_KEY

    jwt.verify(token, token_key, (err, decoded) => {
        if (err) {
          res.json({error:"error"})
          return;
        }
      
        Rider.findById(decoded.user_id).then((doc)=>{

if(doc)
{
    console.log(doc)
}

        })
      });





}
