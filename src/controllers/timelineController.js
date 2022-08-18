import { urlMetadataInfo } from '../globalFunctions/urlDataFunction.js';
import db from '../config/db.js';
import dayjs from 'dayjs';

export const getTimelineController = async (req, res) => {
    const { timelineList } = res.locals
    const {timestamp} = req.query;
    const now = dayjs()
    console.log("TIMELINE LIST 2",timelineList, now)
    try{
        const list = []
        
        for(let post of timelineList){
            console.log("TIMELINE LIST 3",post)
            let postInfo = {}
            if(post.posts_id){   
                const postData = await db.query(`SELECT posts.*, users.username, users.profile_image,
                                                    COUNT(comments.post_id) as "countComments"
                                                    FROM posts
                                                    JOIN users ON posts.user_id = users.id
                                                    LEFT JOIN comments ON comments.post_id = posts.id
                                                    WHERE posts.id=$1
                                                    GROUP BY posts.id, users.username, users.profile_image`, [post.posts_id])
                const postRow = postData.rows[0]
                const whoRepostedData = await db.query(`SELECT * FROM users WHERE id = $1;`, [post.user_id])
                const repostsData = await db.query(`SELECT * FROM reposts WHERE post_id" = $1;`, [post.posts_id])

                postInfo = {
                    isRepost: true,
                    whoReposted: whoRepostedData.rows[0].username,
                    userRepostedId: post.user_id,
                    userPictureResposted: whoRepostedData.rows[0].profile_image, 
                    created_at:post.created_at,
                    id:postRow.id,
                    user_id:postRow.user_id,
                    username: postRow.username,
                    profile_image:postRow.profile_image,
                    message:postRow.message,
                    shared_url: postRow.shared_url,
                    edited:postRow.edited,
                    numberReposts: repostsData.rows.length, 
                    countComments: postRow.countComments
                }
                console.log("TIMELINE LIST 4",postInfo)
            }else{
                const repostsData = await db.query(`SELECT * FROM reposts WHERE post_id = $1;`, [post.id])
                const postUserData = await db.query(`SELECT * FROM users WHERE id = $1;`, [post.user_id])
                const postUser = postUserData.rows[0]
                postInfo = {
                    ...post,
                    username: postUser.username,
                    profile_image:postUser.profile_image,
                    numberReposts: repostsData.rows.length
                }
                console.log("TIMELINE LIST 5",postInfo)
            }
            list.push(postInfo)
            console.log("TIMELINE LIST 6",list)
        }
        list.sort((y, x) => (x.created_at - y.created_at))
        let reducedList = list.sort((y, x) => (x.created_at - y.created_at)).filter(post => new Date(post.created_at) < new dayjs());
        console.log("TIMELINE LIST 7", reducedList)
        reducedList = reducedList.slice(0,10);
        for(let postInfo of reducedList) {
            postInfo.urlMeta = await urlMetadataInfo(postInfo.shared_url);
        }
        
        
        return res.status(200).send((res.locals.additionalReturn) ? {pageContext: res.locals.additionalReturn, postsList: reducedList} : reducedList);
        
    }catch(error){
        console.log(error)
        return res.status(500).json({message: 'Erro ao tentar se conectar com o banco de dados no controller.'})
    }
}