// // src/middleware/authenticateToken.js
// import jwt from 'jsonwebtoken';

// const SECRET_KEY = 'secret_key_jwt';

// export const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, SECRET_KEY, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
  
// };


////////////////////////////////////

// src/middleware/authenticateToken.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'secret_key_jwt';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // Aquí se agrega el perfil_id al objeto user
    next();
  });
};
