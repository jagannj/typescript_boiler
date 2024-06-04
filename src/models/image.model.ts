import mongoose from "mongoose";
import User,{UserDocument} from "./user.model";

export interface ImageDocument extends mongoose.Document{
    user:UserDocument["_id"]
    type:string,
    smUrl:string,
    webUrl:string,

}

const ImageSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:"User"
    },
    type:{
        type:String,
        required:true
    },
    smUrl:String,
    webUrl:String,
},{timestamps:true});
const Image = mongoose.model<ImageDocument>("Image",ImageSchema)

export default Image;