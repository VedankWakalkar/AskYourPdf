import mongoose from "mongoose";

const userUpload= new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    fileNames:{
        type:[String],
        default:[]
    },
    upadateAt:{
        type:Date,
        default:Date.now
    }
})

const UploadPDF= mongoose.model("UploadPDF",userUpload)

export default UploadPDF;