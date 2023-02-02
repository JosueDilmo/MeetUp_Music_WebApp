
/*
// API RESTful

// Types of parameters
* Query Params => Persistir estado (Filtros, Paginacao, Ordenacao, etc), definir estado, NAO usar informacao sensivel
 * nomear os parametros com ? para torna-los opcionais.
 * Routes Params => Accesar recursos, identificar recursos.
 * Body Params => Enviar informacao para criacao ou atualizacao de um registro, geralmente varias informacoes
 * {USAR PARA INFORMACAO SENSIVEL}
 

// HTTP methods
*GET: Buscar ou listar uma informacao
*POST: Criar alguma nova informacao
*PUT: Atualizar/editar uma informacao existente
*DELETE: Deletar uma informacao existente
*PATCH: Alterar uma informacao especifica

// HTTP Codes
*2: Sucesso
*3: Redirecionamento
*4: Erros no cliente
*5: Erros no servidor
*/

import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
app.use(express.json())

const prisma = new PrismaClient({
    log: ['query']
})

// ROUTES

/* GET ALL EVENTS */
app.get('/events', async (request, response) => {
    const events = await prisma.events.findMany({
        // include: {
        //     user: true,
        // }
 
    })
    
    return response.json(events)
    })

/* GET ALL USERS */
app.get('/users', async (request, response) => {
    const users = await prisma.users.findMany({
    })

    return response.json(users)
    })


/* ADD ONE EVENT */
app.post('/user/:id/events', async (request, response) => {
    const userId: any = request.params.id
    const body = request.body

    const event = await prisma.events.create({
        data: {
            ownerId: String(userId),
            joinedId: body.joinedId,
            latitude: body.latitude,
            longitude: body.longitude,
            duration: body.duration,
        }
    })

    return response.status(201).json(event)
    })

        



app.listen(3333)