import userRepository from '../repositories/usersRepository.js';


export async function getUsersByNameFollowersFirst(req, res){
    try {
        const result = await userRepository.getUserByName();
        return res.status(200).send(result);

    } catch (error) {
        return res.status(500).send(error);
    }
}

export const getUser = async (req, res) => {
    try {
        const result = await userRepository.getUser();
        const user = result.rows[0]
        return res.status(200).send(user)

    } catch(error) { 
        return res.status(500).send(error) 
    }
}