// api/login.js

module.exports = (req, res) => {
    if (req.method === 'POST') {
      const { username, password } = req.body;
  
      // Implement your login logic here
  
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  };