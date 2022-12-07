import mongoose from "mongoose";



const organizationSchema = mongoose.Schema({

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

posts:[
    {
        text :{ type:String, required:false},
        image:{ type:String, required:false},
    }
],

followingVeterans:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Veteran'
    }
],

CreatedEvents:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event'
    }
],

email:{
    type:String,
    required:true,
    unique:true
},

password:{
    type:String,
    required:true
}
},{
    timestamps :true
})


const Organization = mongoose.model("Organization",organizationSchema)

export default Organization

