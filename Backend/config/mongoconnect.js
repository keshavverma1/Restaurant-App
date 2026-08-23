import mongoose from "mongoose";

const connectDatabase = async () =>{
    await mongoose.connect(process.env.MONGO_URI,{dbName:"Restaurant"}).then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.log(err);
    })
}
export default connectDatabase;