
// api/register.js

module.exports = (req, res) => {
    if (req.method === 'POST') {
      const { username, password, name, college, course, dob, contact, sex } = req.body;
  
      // Implement your registration logic here
  
      res.status(201).json({ message: 'Registration successful' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  };
    