import express from "express"
import cookieParser from 'cookie-parser'
import { connectToDatabase } from "../mongodb"
import { API_PORT } from "../environment/env"
import {router} from './routes'
import passport from "passport"
import passportStrategy from '../../infra/setup/passport'

const app = express()

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