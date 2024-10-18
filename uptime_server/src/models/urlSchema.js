
import mongoose from "mongoose";
import { Schema } from "mongoose";

const urlSchema = new Schema({
    url:{
        type:String,
        required : true,
    },
    name : {
        type : "String",
        required : true,
    },
    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    status: { type: String, default: 'unknown' }, 
    lastChecked: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now }

})


const Url = mongoose.model("Url" , urlSchema);
export default Url
