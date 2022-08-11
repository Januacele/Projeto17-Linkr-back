import db from '../config/db.js';

export async function getPostsUsersFollows(user_id){
    return db.query(`
    SELECT posts.*, follows.followed_id, follows.follower_id, COUNT(comments.post_id) as "countComments"
    FROM posts
    JOIN follows ON follows.followed_id = posts.user_id
    LEFT JOIN comments ON comments.post_id = posts.id
    WHERE follows.follower_id"= $1
    GROUP BY posts, posts.id, follows.follower_id, follows.followed_id`, [user_id]);
}

export async function getPostsTimeline(){
    return db.query(`
    SELECT posts.*, users.username, users.profile_image,
    COUNT(comments.posts_id) as "countComments"
    FROM posts
    JOIN users ON posts.user_id = users.id
    LEFT JOIN comments ON comments.post_id = posts.id
    WHERE posts.id=$1
    GROUP BY posts.id, users.username, users.profile_image`, [post.post_id])
}

export async function repostedUserFollows(){
    return db.query(`
    SELECT * FROM users
    WHERE id=$1`, [posts.user_id]);
}

export async function repostedTimeline(){
    return db.query(`
    SELECT * FROM reposts
    WHERE post_id=$1`, [post.post_id]);
}