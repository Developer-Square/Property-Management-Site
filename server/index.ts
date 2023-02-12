const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./mongoDB/connect');
const userRouter = require('./routes/user.routes');
const propertyRouter = require('./routes/property.routes');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send('Hola de Kenya!');
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/properties', propertyRouter);

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to the database
    await connectToDatabase(process.env.MONGODB_URI || '');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
