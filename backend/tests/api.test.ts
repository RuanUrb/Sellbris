import {describe, expect, test} from '@jest/globals';
import mongoose from 'mongoose';
import { TEST_DB_URL } from '../src/infra/environment/env';
import request from 'supertest'
import { app } from '../src/infra/server/app';



describe('API endpoints', ()=>{
    it('Should return 401 as there is no JWT for GET /auth', async ()=>{
        const res = await request(app).get('/auth')
        expect(res.status).toBe(401)        
    })

    it('Should return 400 for POST /auth/register due to invalid data', async ()=>{
        const res = await request(app).post('/auth/register')
        .send({
            name: "Ru",
            email: "ruan@gmail.com",
            password: "12312312",
            location: "PORTO ALEGRE - RS - BRASIL"
        })
        expect(res.status).toBe(400)
    })

    it('Should return 400 for POST /auth/register due to already registered user', async ()=>{
        const res = await request(app).post('/auth/register')
        .send({
            name: "Reo",
            email: "ruan@gmail.com",
            password: "12312312",
            location: "PORTO ALEGRE - RS - BRASIL"
        })
        expect(res.status).toBe(400)
    } )

    it('Should return 201 for successfully created user at POST /auth/register', async ()=>{
        const res = await request(app).post('/auth/register')
        .send({
            name: "Ruan",
            email: "ruan@gmail.com",
            password: "12312312",
            location: "PORTO ALEGRE - RS - BRASIL"
        })
        expect(res.status).toBe(201)
    } )
})