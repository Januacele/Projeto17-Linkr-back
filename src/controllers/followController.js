import followRepository from '../repositories/followRepository.js';

export async function followUser(req, res) {
    const followed_id = req.params.id;
    const following_id = res.locals.userId;
    try {

      if (parseInt(followed_id) === parseInt(following_id)) {
        return res.status(401).send("User and followed are the same person!");
      }
  
      const follow = await followRepository.getFollow(followed_id, following_id);
      console.log(follow)
      if (!follow.rows) {
        return res.status(401).send("The user already follow this person!");
      }
  
      await followRepository.insertFollow(followed_id, following_id);
  
      res.sendStatus(201);
    } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
    }
  }


  export async function checkFollow(req, res) {
    try {
      const followed_id = req.params.id;
      const following_id = res.locals.userId;
  
      const follow = await followRepository.getFollow(followed_id, following_id);
  
      res.status(200).send(follow.rows[0]);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  export async function sendAllFollows(req, res) {
    try {
    
      const following_id = res.locals.userId;
  
      const follows = await followRepository.getAllFollowed(following_id);
  
      res.status(200).send(follows.rows);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }


  export async function unfollowUser(req, res) {
    try {
      const followed_id = req.params.id;
      const following_id = res.locals.userId;
  
      await followRepository.deleteFollow(following_id, followed_id);
  
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }