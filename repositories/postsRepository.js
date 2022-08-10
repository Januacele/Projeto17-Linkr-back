import db from '../config/db.js';

export async function getPostsTimeline(){
    return db.query(`
    SELECT posts.*, follows.followed_id, follows.follower_id, COUNT(comments.post_id) as "countComments"
    FROM posts
    JOIN follows ON follows.followed_id = posts.user_id
    LEFT JOIN comments ON comments.post_id = posts.id
    WHERE follows.follower_id"= $1
    GROUP BY posts, posts.id, follows.follower_id, follows.followed_id`, [user_id]);
}