import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('mongodb is already connected');
        return;

    } else {
        try {
            await mongoose.connect(process.env.MONGODB_URL, {
                dbName: 'share_prompt',
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            isConnected = true;
            console.log('MONGODB connected');
        } catch (error) {
            console.log(error);
        }
    }
}