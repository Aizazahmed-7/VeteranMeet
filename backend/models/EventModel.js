import mongoose from "mongoose";

const eventSchema = mongoose.Schema({

name:{
    type:String,
    required:true,
},

image:{
    type:String,
    required:true,
},

description:{
    type:String,
    required:true,
},

date:{
    type:Date,
    required:true,
},

location:{
    type:String,
    required:true,
},

organization:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Organization',
    required:true,
},


interestedVeterans:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Veteran',
        required:true,
    }
],

hobbies:[
    {
    type:String,
    required:true,
    }
],

stars:{
    type:Number,
    required:true,
    default:0,
},



},{
    timestamps :true
})


const Event = mongoose.model("Event",eventSchema)

export default Event

