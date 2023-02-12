const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./mongoDB/connect');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send('Hola de Kenya!');
});

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
