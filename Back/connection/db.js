import mongoose from "mongoose"

export async function connectDB() {
    await mongoose.connect("mongodb+srv://rishijangirjr:3A3tixtDmpQ6S4le@cluster0.ektln.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
}