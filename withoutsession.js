const express = require('express');
const { connectMongoDB } = require('./lib/mongodb');
const UserCredentials = require('./models/usercredentails');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectMongoDB();

app.get('/api/users/:email', async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();
    console.log('Searching for email:', email);

    const userCredentials = await UserCredentials.findOne({ email }, { _id: 1 });

    if (userCredentials) {
      console.log('User found:', userCredentials);
      return res.json({ exists: true, _id: userCredentials._id });
    } else {
      console.log('User not found');
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});