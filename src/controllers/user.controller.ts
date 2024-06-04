import User, { UserDocument } from "../models/user.model";
import bcrypt from 'bcrypt';
import { Request, Response } from "express"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export const Signup = async (req: Request, res: Response) => {
    try {

        const param = req.body;
        const saltfactor = process.env.SALT_FACTOR
        const salt = await bcrypt.genSalt(12);
        console.log("salt===", salt)
        const hashedPassword = await bcrypt.hash(param.password, salt)

        const data = {
            firstName: param.firstName,
            lastName: param.lastName,
            phone: param.phone,
            email: param.email,
            password: hashedPassword,
            image: param.image,
            role: "user"
        } as UserDocument;

        let userExist = await User.findOne({ email: param.email })

        if (userExist) {
            return res.status(400).send({
                message: "User Already Exists",
                error: true
            })
        }
        const newUser = new User(data);
        const userData = await newUser.save();
        const outData = {
            _id: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone,
            image: userData?.image,
            password:hashedPassword,
            role: userData.role
        }

        return res.status(200).send({
            message: "User Created Sucessfully",
            data: outData
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Internal server Error"
        })

    }

}
export const Signin = async (req: Request, res: Response) => {
   try {
    

    interface ISignin {
        email: string;
        password: string;
    }


    const param: ISignin = req.body;


    const user = await User.findOne({ email: param.email })



    if (!user) {
        return res.status(400).send({
            message: "User does not exists"
        })
    }

    if (!user.password) {
        return res.status(400).send({
            message: "Please Check your Password!"
        })
    }

    const VaildPassword = await bcrypt.compare(param.password, user.password)
    const key: any = process.env.JWT_PRIVATE_KEY
    if (!VaildPassword) {
        return res.status(400).send({
            message: "Invalid Password!"
        })
    }

    let token = jwt.sign({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName

    }, key, { expiresIn: "8d" })

    const outData = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        image: user?.image,
        role: user.role,
        token: token
    }

    return res.status(200).send({
        message: "User Created Sucessfully",
        data: outData
    })


   } catch (error) {
    console.log(error)
        return res.status(500).send({
            message: "Internal server Error"
        })
   }


}



export const GetUser = async(req: Request, res: Response)=>{
    try {
        // @ts-ignore
        const _id = req.user._id;

        const user = req.params.id;
        // @ts-ignore
        console.log("dvgfg",req.user)
        const UserData : UserDocument | null= await User.findById({_id:user}) 
        if(!UserData) {
            return res.status(400).send({message:"USer Not Found"})
        }

        return res.status(200).json({message:"USer Sucessfully fetched",
            data:UserData
        })


    } catch (error:any) {
        return res.status(500).send({message:error.message})
        
    }
}

export const UpdateUser = async(req: Request, res: Response)=>{
    try {
        // @ts-ignore
    const userId = req.user._id

    const data = req.body

    const user : UserDocument |null = await User.findByIdAndUpdate(
        {_id:userId},{$set:data},{new:true}
    )

    const userData = {
        _id: user?._id,
        firstName: user?.firstName,
        lastName:user?.lastName,
        email:user?.email,
        phone:user?.phone
    }


    if(!user){
        return  res.status(400).send({message:"USer Not Found"})
    }

    return  res.status(200).send({message:"USer Updated Sucess",data:userData})
    } catch (error:any) {
        console.log(error)
        return  res.status(500).send({message:error.message})
    }



}

export const DeleteUSer = async(req: Request, res: Response)=>{
    try {
        // @ts-ignore
        const user = req.user._id;

        const deleteUser = await User.findByIdAndDelete({_id:user})

        if(!deleteUser){
            return res.status(400).send({message:"USer Not Found"})
        }
        return res.status(200).json({message:"USer Delete Sucessfully "})
            
    } catch (error:any) {
        console.log(error)
        return  res.status(500).send({message:error.message})
        
    }
}