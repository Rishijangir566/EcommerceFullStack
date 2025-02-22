import mongoose from "mongoose"
import "dotenv/config"

export async function connectDB() {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ektln.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0`)
}