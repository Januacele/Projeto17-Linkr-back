import {editPostSchema} from '../schemas/postSchema.js';
import db from '../config/db.js';

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