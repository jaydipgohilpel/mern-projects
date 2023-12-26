import express from "express";
import router from "./routes/user.js";
import {schema} from "./model/user.js";

const server = express();
const allowCrossDomain = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
const validateUser = async (req, res, next) => {
    
  if (Object.keys(req.body).length) {
    try {
      const value = await schema.validateAsync(req.body);
      if (!value.error) {
        next();
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }else{
    next();
  }
};

server.use(allowCrossDomain);
server.use(express.json());
server.use("/api/users", validateUser, router);

server.listen(3001, () => console.log("server started"));
