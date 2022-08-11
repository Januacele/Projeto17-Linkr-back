import postRepository from '../repositories/usersRepository.js';

export async function getUsersByNameFollowersFirst(req, res){
    try {
        const result = await postRepository.getUserByName();

        return res.status(200).send(result);

    } catch (error) {
        return res.status(500).send(error);
    }
}