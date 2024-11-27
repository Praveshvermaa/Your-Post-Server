const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    postImage:{
        type:'String',
    },
    postCaption:{
        type:'String'
    },
    CreatedAt:{
        type:Date,
        default:Date.now
    },
   public_id:{
    type:'String',
   }
})
const post = mongoose.model("post",postSchema)
module.exports = post;