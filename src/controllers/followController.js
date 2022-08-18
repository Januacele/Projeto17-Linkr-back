import followRepository from '../repositories/followRepository.js';

export async function followUser(req, res) {
    try {
      const { id } = req.params;
      const { user } = res.locals;

      if (parseInt(id) === parseInt(user.id)) {
        return res.status(401).send("User and followed are the same person!");
      }
  
      const follow = await followRepository.getFollow(user.id, id);
  
      if (!follow.rows[0]) {
        return res.status(401).send("The user already follow this person!");
      }
  
      await followRepository.insertFollow(user.id, id);
  
      res.sendStatus(201);
    } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
    }
  }


  export async function checkFollow(req, res) {
    try {
      const { id } = req.params;
      const { users } = res.locals;
  
      const follow = await followRepository.getFollow(user.id, id);
  
      res.status(200).send(follow.rows[0]);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  export async function sendAllFollows(req, res) {
    try {
      const { user_id } = res.locals;
  
      const follows = await followRepository.getAllFollowed(user.id);
  
      res.status(200).send(follows.rows);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }


  export async function unfollowUser(req, res) {
    try {
      const { id } = req.params;
      const { user_id } = res.locals;
  
      await followRepository.deleteFollow(user.id, id);
  
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }