import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
const connectDB = async () => {
  try {
    const connection = await mongoose.connect('mongodb+srv://shanmugaraj:asdfghjkl@cluster0.as2bu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connected: ${connection.connection.host}`);
    mongoose.set('strictQuery', true); // Disable strictQuery to suppress the deprecation warning
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
