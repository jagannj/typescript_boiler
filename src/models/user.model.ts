import mongoose from "mongoose";


export interface UserDocument extends mongoose.Document {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    image?: string;
    role: string;
    createdAt:Date;
    updatedAt:Date;

}
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        phone: String,
        email: String,
        password: String,
        image: String,
        role: {
            type:String,
            enum: ["admin", "user"],
            default: "user",
            

        }
    },{timestamps:true}

)
const User = mongoose.model<UserDocument>("Userss",userSchema);
export default User