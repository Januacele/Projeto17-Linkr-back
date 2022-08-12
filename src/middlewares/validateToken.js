import sessionRepository from '../repositories/sessionsRepository.js';


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
  
    
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error token validate")
    }  
  }