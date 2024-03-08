const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");

const generateToken = require("../config/generateToken");
const registerUser = asyncHandler(
    async (req,res)=>{
        const {name,email,password,pic} =req.body;
        if(!name || !email ||!password){
            res.status(400);
            throw new Error("Please Enter all the Fields");
        }

            const userExists = await User.findOne({email})

            if(userExists){
                res.status(400);
                throw new Error ("User Already Exits")
            }

            const user = await User.create({
                name, 
                email,
                password,
                pic,
            });
            if(user){
                res.status(201).json({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    pic:user.pic,
                    token :generateToken(user._id)
                })
            }else{
                res.status(400);
                throw new Error("Failed to Create The User")


            }
         

 });
 

 const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        if (await user.matchPassword(password)) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id)
            });
        } else {
            res.status(401); // Unauthorized
            throw new Error('Invalid email or password');
        }
    } else {
        res.status(404); // Not Found
        throw new Error('User not found');
    }
});

const allUsers = asyncHandler(
    async (req,res)=>{
        const keyword = req.query.search?{
            $or:[
                {name:{$regex:req.query.search,$options:"i"}},
                {email:{$regex:req.query.search,$options:"i"}},
            ]
        }:{}
        const users = await User.find(keyword).find({_id:{$ne:req.user._id}});
        res.send(users);
    
    }
)
 module.exports = {registerUser,authUser,allUsers}