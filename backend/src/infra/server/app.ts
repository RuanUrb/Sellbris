import express from "express"
import cookieParser from 'cookie-parser'
import { connectToDatabase } from "../mongodb"
import { API_PORT } from "../environment/env"
const app = express()

connectToDatabase()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser()) // this is utmostly necessary for future JWT auth, never remove





app.listen(API_PORT, ()=>{
    console.log(`Server running on port ${API_PORT}`)
})