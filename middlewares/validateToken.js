import sessionRepository from '../repositories/sessionsRepository.js';
import usersRepository from '../repositories/usersRepository.js';

export async function validateToken(req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send("No token.");
    }
  
    try {
      const { rows:sessions } = await sessionRepository.getSessionByToken(token);
      const [session] = sessions;
  
      if (!session) {
        return res.status(401).send("Session not found.");
      }
  
      const { rows: users } = await usersRepository.getUserById(session.user_id);
      const [user] = users;
      if (!user) {
        return res.status(401).send("User not found."); 
      }
    
      res.locals.user = user;
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error token validate")
    }  
  }