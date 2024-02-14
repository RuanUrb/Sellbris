import mongoose from 'mongoose'
import 'dotenv/config'
import { DB_URL } from '../environment/env'

export const connectToDatabase = ()=>{
    //@ts-ignore
    mongoose.connect(DB_URL)
    const db = mongoose.connection
    db.on('error', (e)=>{
        console.error(e)
    })

    db.once('open', ()=>{
        console.log('Connected successfuly to the database.')
    })

}