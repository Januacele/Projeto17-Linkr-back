import db from '../config/db.js';

export async function getRepostsTimeline(){
    return db.query(`
    SELECT reposts.*, follows.follower_id, follows.followed_id 
    FROM reposts
    JOIN follows ON follows.followed_id = reposts.user_id
    WHERE follows.follower_id=$1`, [user_id]);
}