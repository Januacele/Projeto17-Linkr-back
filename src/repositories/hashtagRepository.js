import db from "../config/db.js"

async function getHashtag(req, res) {
    try {
        const result = await db.query(`SELECT * FROM hashtags LIMIT 10;`)
        return result.rows
    } catch (e) {
        res.status(422).send(e.message);
    }
}

const hashtagRepository = {
    getHashtag
}

export default hashtagRepository