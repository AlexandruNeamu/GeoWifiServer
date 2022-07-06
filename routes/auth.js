const router=require("express").Router();
const bcrypt=require("bcryptjs");
const User=require("../model/User");

const registerUser=async(req,res)=>{
   const salt=await bcrypt.genSalt(10);
   var hashedPassowrd=null;
   if(req.body.password){
       hashedPassowrd=await bcrypt.hash(req.body.password,salt);
   }

   const user=new User({
         username:req.body.username,
         password:hashedPassowrd,
         email:req.body.email,
         firstName:req.body.firstName,
         lastName:req.body.lastName
    });
    try{
         const savedUser=await user.save();
         res.send({user:savedUser}).status(200);
    }catch(err){
         res.send(err).status(400);
    }
}

router.post("/register",async(req,res)=>{
    const userExists=await User.findOne({username:req.body.username});
    const emailExists=await User.findOne({email:req.body.email});
    if(userExists){
        res.send("User already exists").status(400);
    }
    else if(emailExists){
        res.send("Email already exists").status(400);
    }
    else{
        registerUser(req,res);
    }
});

router.post("/login",async(req,res)=>{
    const user=await User.findOne({username:req.body.username});
    if(!user){
        res.send("User not found").status(400);
    }
    else{
        const isMatch=await bcrypt.compare(req.body.password,user.password);
        if(isMatch){
            res.send({user:user}).status(200);
        }
        else{
            res.send("Password is incorrect").status(400);
        }
    }
}
);
module.exports=router;