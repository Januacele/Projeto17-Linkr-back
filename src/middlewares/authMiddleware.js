import bcrypt from "bcrypt"
import db from "../config/db.js"

import authRepository from "../repositories/authRepository.js"

export async function signupMiddleware(req, res, next) {
  console.log("teste fornt mid")
  const { email, username } = req.body
  try {
    const { rows: emails } = await authRepository.getEmail(email, username)
    const [emailConflict] = emails
    if (emailConflict) {
      return res.status(422).send("Email/Username already exists!")
    }
    next()
  } catch (error) {
    console.log("mid 2")


    return res.status(500).send(error.message)
  }
}

export async function signinMiddleware(req, res, next) {
  const { email, password } = req.body
 
  try {
    const { rows: users } = await authRepository.getUserByEmail(email)
    const [user] = users
    if (!user?.email) {
      return res.status(401).send("User not found!")
    }
    if (!bcrypt.compareSync(password, user?.password)) {
      return res.status(401).send("Incorrect password!")
    }
    delete user.password
    res.locals.user = user
    next()
  } catch (error) {
   
    return res.status(500).send(error.message)
  }
}
