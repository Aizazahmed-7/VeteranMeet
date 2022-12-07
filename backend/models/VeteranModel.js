import mongoose from "mongoose";



const veteranSchema = mongoose.Schema({

name:{
    type:String,
    required:true,
},

image:{
    type:String,
    required:false,
},

hobbies:[
    {
    type:String,
    required:true,
    }
],

occupation:{
    type:String,
    required:false,
    default:'',
},
posts:[
    {
        text :{ type:String, required:false},
        image:{ type:String, required:false},
    }
],

followedVeterans:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Veteran'
    }
],

interestedEvents:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event'
    }
],

organizationInvite:[
    {
        organization:{type:mongoose.Schema.Types.ObjectId,ref:'Organization' },
        event :{type:mongoose.Schema.Types.ObjectId,ref:'Event' },
        
    }
],

veteranInvite:[
    {
        veteran:{type:mongoose.Schema.Types.ObjectId,ref:'Veteran' },
        event :{type:mongoose.Schema.Types.ObjectId,ref:'Event' },

    }
],

stars :{
    type:Number,
    required:true,
    default:0
},

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


const Veteran = mongoose.model("Veteran",veteranSchema)

export default Veteran

