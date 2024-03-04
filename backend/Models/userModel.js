const mongoose =require("mongoose");
const userSchema = mongoose.Schema({
        name:{type:String,requird:true},
        email:{type:String,requird:true},
        password:{type:String,requird:true},
        pic:{type:String,
            default:"https://images.pexels.com/photos/381739/pexels-photo-381739.jpeg?cs=srgb&dl=pexels-sevenstorm-juhaszimrus-381739.jpg&fm=jpg"},


},{
    timestamps:true
})
const User = mongoose.model("User",userSchema);
module.exports = User;