import  mongoose from "mongoose";

const DBconn=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/Customer-Churn`)
        console.log("MongoDB connected Successfully");
        
    } catch (error) {
        console.log('MongoDb Connection error');
        
    }
}

export default DBconn;