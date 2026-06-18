import mongoose from "mongoose";

const blockListSchema = new mongoose.Schema({
    token : {
        type : String , 
        required : [true , "token for blocklisting is requried"] , 
        unique : [true , "token must be unique"]
    }
},{timestamps : true});

blockListSchema.index({createdAt  : 1} , {expireAfterSeconds : 60 * 60 * 24 * 3 })

const BlockList = mongoose.model("blocklist", blockListSchema);

export default BlockList ;