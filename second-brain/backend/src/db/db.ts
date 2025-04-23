import mongoose from "mongoose"
export const connectDb = async() => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI!);
        if(connectionInstance){
            console.log("MOGNODB CONNECTION SUCCESSFULL" , connectionInstance.connection.host);
        }
    } catch (error) {
        console.error(error , "Error while connecting the database");
    }
}