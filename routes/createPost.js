const express = require('express')
const router = express.Router();
const upload = require('../models/multer');
const post = require('../models/post')
const user = require('../models/userSchema')
const verifyToken = require("../middileware/verifyToken")
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const { error } = require('console');
//route to create new user post
router.post('/upload',upload.single("postImage"),verifyToken, async (req,res)=>{
    try {
        const {postImage,postCaption} = req.body;
       
        const loginuser = await user.findById(req.user.userid);
       
        const newpost = new post({
            userId:loginuser._id,
            postImage:`/images/${req.file.filename}`,
            postCaption:postCaption,

        })
        await newpost.save();
        loginuser.posts.push(newpost._id);
        await loginuser.save();
       
        
        res.json({success:true})


    } catch (error) {

        console.log("err:",error)
        res.json({success:false})
    }
})
//route to edit profile picture
router.post("/editpicture",upload.single('profileImage'),verifyToken,async(req,res)=>{
    try {
        
        const loginuser = await user.findById(req.user.userid);
        if(!loginuser){
            return res.json({success:false})
        }
        loginuser.profile_picture = `/images/${req.file.filename}`;
        await loginuser.save();
        res.json({user:loginuser,success:true})
    } catch (error) {
        console.log("error",error)
    }
})
//routes for fetch all posts that eixts in database post model
router.get("/allposts", async (req,res)=>{
    try {
        const allpost = await post.find().sort({ CreatedAt: -1 }).populate("userId");
        res.json({success:true,posts:allpost})
    } catch (error) {
        console.log(error);
        res.json({success:false,error});
    }

})
router.post("/deletePost",verifyToken,async(req,res)=>{
    try {
        const {id} = req.body;
        if (!id) {
            return ;
        }
        const postToDelete = await post.findById(id);
        if (!postToDelete) {
            return res.json({success:false,message:"Post is not found"})
        }
        const imagePath = postToDelete.postImage;
        console.log(imagePath);

        const filePath = path.join(__dirname,'..',imagePath);
        fs.unlink(filePath,(err)=>{
            if(err){
                console.log(error);
                
            }
            else{
                console.log("Image file deleted successfully");
                
            }
        })
        const updateduser = await user.findByIdAndUpdate(
            req.user.userid,
            { $pull: { posts: id } },
            { new: true }
          ).populate('posts');

         
        
    const updatedpost =  await post.findByIdAndDelete(id);
   
      
      

      res.json({updateduser,success:true});

    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
})
module.exports = router;