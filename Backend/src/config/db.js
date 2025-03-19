import mongoose  from "mongoose";
const DatbaseConnect= (Uri)=>{
    try {
        mongoose.connect(Uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    }

}

export default DatbaseConnect;