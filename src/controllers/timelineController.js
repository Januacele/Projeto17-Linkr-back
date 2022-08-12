import { urlMetadataInfo } from '../globalFunctions/urlDataFunction.js';
import postsRepository from '../repositories/postsRepository.js';

export async function getTimelineController (req, res){
    const { timelineList } = res.locals
    const { rows:timestamp } = await postsRepository.getPostsTimeline();

    try {
        const list = []
        
        for(let post of timelineList){
            let postInfo = {}
            if(post.postsId){
                const postData = await postsRepository.getPostsTimeline();
                const postRow = postData.rows[0];

                const whoRepostedData = await postsRepository.repostedUserFollows();
                const repostsData = await postsRepository.repostedTimeline();

                postInfo = {
                    isRepost: true,
                    whoReposted: whoRepostedData.rows[0].username,
                    userRepostedId: post.user_id,
                    userPictureResposted: whoRepostedData.rows[0].profile_image, 
                    createdAt:post.created_at,
                    id:postRow.id,
                    user_id:postRow.user_id,
                    username: postRow.username,
                    profile_image:postRow.profile_image,
                    message:postRow.message,
                    shared_url: postRow.shared_url,
                    numberReposts: repostsData.rows.length, 
                    countComments: postRow.countComments
                }

            } else {
                const repostsData = await postsRepository.repostedTimeline();
                const postUserData = await postsRepository.repostedUserFollows();
                const postUser = postUserData.rows[0];
                postInfo = {
                    ...post,
                    username: postUser.username,
                    profile_image:postUser.profile_image,
                    numberReposts: repostsData.rows.length
                }
            }
            list.push(postInfo);
        }  
        list.sort((y, x) => (x.created_at - y.created_at));
        let reducedList = list.sort((y, x) => (x.created_at - y.created_at)).filter(post => new Date(post.created_at) < new Date(timestamp));
        reducedList = reducedList.slice(0,20);
        for(let postInfo of reducedList) {
            postInfo.urlMeta = await urlMetadataInfo(postInfo.shared_url);
        }
         return res.status(200).send((res.locals.additionalReturn) ? {pageContext: res.locals.additionalReturn, postsList: reducedList} : reducedList);
        
    }catch(error){
        console.log(error)
        return res.status(500).send("Error conecting database");
    }
}
