require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  // Como algunos sistemas agregan prefijos como "Bearer " al token en la cabecera 'Authorization'
  const tokenWithoutPrefix = token.replace('Bearer ', ''); // elimino el prefijo
  // console.log('--> Received Token:', tokenWithoutPrefix);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(tokenWithoutPrefix, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
