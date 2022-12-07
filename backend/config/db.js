import mongoose from "mongoose";
const connectDB = async ()=> {
try {
    const conn = await mongoose.connect("mongodb+srv://aizaz:1234@cluster0.jtwq8vb.mongodb.net/VeteranMeet?retryWrites=true&w=majority",{
    })
    console.log(`mongoDB connected ${conn.connection.host}`)
} catch (error) {
    console.log(`Error : ${error.message}`)
    process.exit(1);
}
}

export default connectDB


