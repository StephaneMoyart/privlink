import mongoose from "mongoose"

const connectDB = async (): Promise<boolean> => {
    if (mongoose.connections[0].readyState) return true

    try {
        await mongoose.connect(process.env.DATABASE_URL || "")
        console.log('^^mongoDB connected^^')
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export default connectDB