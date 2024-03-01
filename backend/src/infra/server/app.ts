import express from "express"
import cookieParser from 'cookie-parser'
import { connectToDatabase } from "../mongodb"
import { API_PORT } from "../environment/env"
import {router} from './routes'
import passport from "passport"
import passportStrategy from '../../infra/setup/passport'
import cors from 'cors'

const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
connectToDatabase()

passportStrategy(passport)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser()) // this is utmostly necessary for future JWT auth, never remove
app.use(router)




app.listen(API_PORT, ()=>{
    console.log(`Server running on port ${API_PORT}`)
})

export {app}