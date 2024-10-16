import dotenv from "dotenv"

dotenv.config()

export const  port = process.env.PORT
export const mongodb_url = process.env.MONGO_DB_URL
export const jwt_secret = process.env.JWT_SECRET