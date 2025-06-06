import mongoose from "mongoose";
import { MONGO_URL } from "../config/env.js";

if(!MONGO_URL){
    console.log("Checking for the Mongodb url: ",MONGO_URL);
    throw new Error("Please Provide the Database URL")
}

const connectToDatabase= async ()=>{
    try{
        await mongoose.connect(MONGO_URL);
        console.log("connected to the Mongo Database")
    }catch(e){
        console.log("Some error occured during connection : ",e);
        process.exit(1)
    }
}

export default connectToDatabase;