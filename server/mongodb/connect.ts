import mongoose from 'mongoose';

const connectToDatabase = async (url: string) => {
  mongoose.set('strictQuery', true);

  mongoose
    .connect(url)
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err));
};

module.exports = connectToDatabase;
