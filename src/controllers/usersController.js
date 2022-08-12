import usersRepository from '../repositories/usersRepository.js';


export async function getUsersByNameFollowersFirst(req, res){
    const { username } = req.query
    const { userId } = res.locals
    try {
        const result = await usersRepository.getUserByName(username, userId);
        return res.status(200).send(result.rows);

    } catch (error) {
        return res.status(500).send(error);
    }
}

export const getUser = async (req, res) => {
    const { userId } = req.params
    try {
        const result = await usersRepository.getUserById(userId);
        const user = result.rows[0]
        return res.status(200).send(user)

    } catch(error) { 
        return res.status(500).send(error) 
    }
}