import {editPostSchema} from '../schemas/postSchema.js';
import db from '../config/db.js';
import Joi from 'joi';

export async function editPostValidation(req, res, next){
    const { id, user_id, message } = req.body
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer", "").trim()

    const {error} = editPostSchema.validate({id, user_id, message})
    if(error){
        console.log(id)
        return res.status(422).json({message:'Não foi possível editar sua postagem.'})
    }

    try{
        const sessionData = await db.query(`SELECT * FROM sessions WHERE sessions.token = $1;`, [token])
        if(sessionData.rows.length===0) return res.status(404).json({message:'Não é possivel utilizar o token atual.'})
        const session = sessionData.rows[0]
        if(session.user_id != parseInt(user_id)) return res.status(422).json({message:'Você não tem permissão para editar este post.'})

        res.locals.editPostData = {
            id: id,
            message: message,
            user_id: session.user_id
        }
    }catch(error){
        return res.status(500).json({message: 'Erro ao acessar o banco de dados.'})
    }
    next()
}


export async function userPageValidation(req, res, next){
    try{
        const userData = (await db.query(`SELECT users.id, users.username, users.profile_image
                                                FROM users
                                                WHERE users.id = $1`, [parseInt(req.params.id)])).rows

        if (userData.length === 0)
            return res.status(404).send('User not found');
        
        const postsData = await db.query(`SELECT posts.*, COUNT(comments.posts_id) as "countComments"
                                                FROM posts 
                                                LEFT JOIN comments ON comments.post_id=posts.id
                                                WHERE posts.user_id=$1
                                                GROUP BY posts, posts.id`, [parseInt(req.params.id)])
        const posts = postsData.rows

        const repostsData = await db.query(`SELECT reposts.* FROM reposts WHERE reposts.user_id=$1`, [parseInt(req.params.id)])
        const reposts = repostsData.rows

        const timelineList = [...posts, ...reposts]
        const additionalReturn = { user: userData[0] }
        console.log(additionalReturn)
        res.locals = {
            timelineList,
            additionalReturn
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({message: 'Erro ao acessar o banco de dados.'})
    }
    next()
}

export async function deletePostValidation(req, res, next){
    const { id } = req.params
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer", "").trim()
    
    const deletePostSchema = Joi.object({
        id: Joi.number().required() 
    })
    const {error} = deletePostSchema.validate({id})
    if(error){
        return res.status(422).json({message:'ID invalido Impossivel deletar.'})
    }
    try{
        const postData = await db.query(
            `SELECT * FROM posts
             JOIN sessions ON sessions.token = $1
             WHERE posts.user_id = sessions.user_id AND posts.id = $2;`, [token, id])
        if(postData.rows.length===0) return res.status(404).json({message:'Você não tem permissão para deletar este post.'})
        res.locals = {id: id}
    }catch(error){
        return res.status(500).json({message: 'Erro ao acessar o banco de dados.'})
    }
    next()
}