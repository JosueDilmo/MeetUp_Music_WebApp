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

import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "./utils/convertHourStringToMinutes";
import { convertMinutesToHourString } from "./utils/convertMinutesToHourString";

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  log: ["query"],
});

// ROUTES

/* GET ALL EVENTS to be display on the LANDING PAGE*/
app.get("/get-events", async (request, response) => {
  const events = await prisma.events.findMany({
    select: {
      eventId: true,
      latitude: true,
      longitude: true,
    },
  });

  // TODO: JUST THE LATITUDE AND LONGITUDE OF THE EVENTS
  return response.status(201).json(events);
});

/* GET ALL EVENTS HAPPENING NOW */
app.get("/happening-now", async (request, response) => {
  const events = await prisma.events.findMany({
    select: {
      eventId: true,
      ownerId: true,
      joinedId: true,
      latitude: true,
      longitude: true,
      hourStart: true,
      hourEnd: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return response.status(201).json(
    events.map((event) => {
      return {
        ...event,
        joinedId: event.joinedId.split(","),
        hourStart: convertMinutesToHourString(event.hourStart),
        hourEnd: convertMinutesToHourString(event.hourEnd),
      };
    })
  );
});

// Create a new event
app.post("/create/:id", async (request, response) => {
  const userId: any = request.params.id;
  const { joinedId, latitude, longitude, hourStart, hourEnd }: any =
    request.body;

  //TODO: joinedId should be empty when creating a new event
  const createdEvent = await prisma.events.create({
    data: {
      ownerId: userId,
      joinedId: joinedId,
      latitude: latitude,
      longitude: longitude,
      hourStart: convertHourStringToMinutes(hourStart),
      hourEnd: convertHourStringToMinutes(hourEnd),
    },
  });
  return response.status(201).json(createdEvent);
});

// Route to join an event by id and add new user ID to joinedId keeping the previous ones
//TODO: validate if the user is already in the event
app.put("/join-event/:id", async (request, response) => {
  const eventId: any = request.params.id;
  const userId: any = request.body.userId;

  const eventToJoin = await prisma.events.findUniqueOrThrow({
    where: {
      eventId: eventId,
    },
  });
  const joinedIds = eventToJoin.joinedId;

  const updateEvent = await prisma.events.update({
    where: {
      eventId: eventId,
    },
    data: {
      joinedId: userId + "," + joinedIds,
    },
  });

  return response.status(201).json(updateEvent);
});

/* GET ALL USERS */
app.get("/users", async (request, response) => {
  const users = await prisma.user.findMany({});

  return response.json(users);
});

/* GET USER name BY ID */
//TODO: find a way to get the user name by id
app.get("/user-name", async (request, response) => {
  const users = await prisma.user.findMany({
    select: {
      userId: true,
      name: true,
    },
  });
  return response.json(users);
});

app.listen(3333);
