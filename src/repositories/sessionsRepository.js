import db from '../config/db.js';

async function getSessionByToken(token){
    return db.query(`SELECT FROM session WHERE token = $1`, [token]);
}

export default getSessionByToken