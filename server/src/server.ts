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
// json() => middleware
app.use(express.json());
// CORS - Cross Origin Resource Sharing
app.use(cors());

const prisma = new PrismaClient({
  // Log all prisma client queries to the console
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
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return response.status(201).json(
    events.map((event) => {
      return {
        ...event,
        joinedId: event.joinedId?.split(","),
        hourStart: convertMinutesToHourString(event.hourStart),
        hourEnd: convertMinutesToHourString(event.hourEnd),
      };
    })
  );
});

// Create a new event
app.post("/create-event/:id", async (request, response) => {
  const userId: any = request.params.id;
  const { latitude, longitude, hourStart, hourEnd }: any = request.body;

  //TODO: joinedId should be empty when creating a new event
  const createdEvent = await prisma.events.create({
    data: {
      ownerId: userId,
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

  const eventToJoin = await prisma.events.findUnique({
    where: { eventId },
  });
  if (!eventToJoin) {
    return response.status(404).json({ message: "Event not found" });
  }

  if (eventToJoin.joinedId === null) {
    const updatedNullEvent = await prisma.events.update({
      where: { eventId },
      data: {
        joinedId: userId,
      },
    });
    return response.status(201).json(updatedNullEvent);
  } else {
    const updatedEvent = await prisma.events.update({
      where: { eventId },
      data: {
        joinedId: userId + "," + eventToJoin.joinedId,
      },
    });
    return response.status(201).json(updatedEvent);
  }
});

/* GET USER name BY ID */
//TODO: find a way to get the user name by id
app.get("/user-name/:id", async (request, response) => {
  const userId: any = request.params.id;
  const userName = await prisma.user.findUniqueOrThrow({
    where: { userId },
    select: {
      firstName: true,
      lastName: true,
    },
  });
  return response.json(userName);
});

/* CREATE USER FROM FIREBASE */
app.post("/create-user/:id", async (request, response) => {
  const userId: any = request.params.id;
  const { firstName, lastName, profession }: any = request.body;

  const createdUser = await prisma.user.create({
    data: {
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      profession: profession,
    },
  });
  return response.status(201).json(createdUser);
});

app.listen(3333);
