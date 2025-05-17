import mongoose from "mongoose";

const connectToDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("DB connection successful")
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/ackwire-backend`)

}

export default connectToDB;