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
    like:{
        type:Number,
        default:0
    }
})
const post = mongoose.model("post",postSchema)
module.exports = post;