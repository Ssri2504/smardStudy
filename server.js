const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('your_mongodb_connection_string', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User schema and model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  college: String,
  course: String,
  dob: Date,
  contact: String,
  sex: String,
});

const User = mongoose.model('User', userSchema);

// Register route
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, name, college, course, dob, contact, sex } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      name,
      college,
      course,
      dob,
      contact,
      sex,
    });
    await user.save();
    res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).send({ error: 'Error registering user' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });
    res.status(200).send({ message: 'Login successful!', token, user });
  } catch (error) {
    res.status(500).send({ error: 'Error logging in' });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
