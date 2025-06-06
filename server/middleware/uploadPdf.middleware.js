import UploadPDF from "../models/user.upload.js";

const uploadMiddleware=async(req,res,next)=>{
    let userId=req.headers['x-user-id'];
    let filename= req.file.originalname;
    if(!userId){
        console.log("Checking For UserId: ",userId)
        return res.status(403).json({
            success:false,
            message:"FORBIDDEN"
        })
    }
    try {
        let userUploads=await UploadPDF.findOne({userId});
        if(!userUploads){
            userUploads=new UploadPDF({
                userId,
                fileNames:[filename]
            })
        }else{
            if(userUploads.fileNames.length>=5){
                return res.status(403).json({
                    success:false,
                    message:"Your Limit has Reached"
                })
            }userUploads.fileNames.push(filename);
        }
        await userUploads.save();
        next()
    } catch (error) {
        console.log("Some Error occured: ",error);
        return res.status(500).json({
            success:false,
            message:"Internal Error Occured"
        })
    }
}

export default uploadMiddleware;