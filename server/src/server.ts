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
      address: true,
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
      address: true,
      hourStart: true,
      hourEnd: true,
      createdAt: true,
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
        createdAt: event.createdAt.toLocaleDateString(),
        hourStart: convertMinutesToHourString(event.hourStart),
        hourEnd: convertMinutesToHourString(event.hourEnd),
      };
    })
  );
});

// Create a new event
app.post("/create-event/:id", async (request, response) => {
  const userId: any = request.params.id;
  const { latitude, longitude, address, hourStart, hourEnd }: any =
    request.body;

  const createdEvent = await prisma.events.create({
    data: {
      ownerId: userId,
      latitude: latitude,
      longitude: longitude,
      address: address,
      hourStart: convertHourStringToMinutes(hourStart),
      hourEnd: convertHourStringToMinutes(hourEnd),
    },
  });
  return response.status(201).json(createdEvent);
});

// Route to join an event by id and add new user ID to joinedId keeping the previous ones
app.put("/join-event/:id", async (request, response) => {
  const eventId: any = request.params.id;
  const userId: any = request.body.userId;

  const eventToJoin = await prisma.events.findUnique({
    where: { eventId },
  });
  if (!eventToJoin) {
    return response.status(404).json({ message: "Event not found" });
  }
  if (eventToJoin.ownerId === userId) {
    return response
      .status(400)
      .json({ message: "You can't join your own event" });
  }

  if (eventToJoin.joinedId === null) {
    const updatedNullEvent = await prisma.events.update({
      where: { eventId: eventToJoin.eventId },
      data: {
        joinedId: userId,
      },
    });
    return response.status(201).json(updatedNullEvent);
  } else if (eventToJoin.joinedId.includes(userId)) {
    return response
      .status(400)
      .json({ message: "You've already joined this event" });
  } else {
    const updatedEvent = await prisma.events.update({
      where: { eventId: eventToJoin.eventId },
      data: {
        joinedId: userId + "," + eventToJoin.joinedId,
      },
    });
    return response.status(201).json(updatedEvent);
  }
});

/* GET username BY ID */
app.get("/user-name/:id", async (request, response) => {
  const userId: any = request.params.id;
  const userName = await prisma.user.findUniqueOrThrow({
    where: { userId },
    select: {
      userId: true,
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

/* Edit User profile/ details */
app.put("/update-user/:id", async (request, response) => {
  const userId: any = request.params.id;
  const { firstName, lastName, profession }: any = request.body;

  const updatedUser = await prisma.user.update({
    where: { userId },
    data: {
      firstName: firstName,
      lastName: lastName,
      profession: profession,
    },
  });

  return response.status(201).json(updatedUser);
});

/* Delete events by ID */
app.delete("/delete-event/:id", async (request, response) => {
  const eventId: any = request.params.id;
  const deletedEvent = await prisma.events.delete({
    where: { eventId },
  });
  return response.status(201).json(deletedEvent);
});

/* GET all events created by a user */
app.get("/user-events/:id", async (request, response) => {
  const userId: any = request.params.id;
  const userEvents = await prisma.events.findMany({
    where: {
      ownerId: userId,
    },
    select: {
      eventId: true,
      address: true,
      hourStart: true,
      hourEnd: true,
      createdAt: true,
    },
  });
  return response.status(201).json(
    userEvents.map((event) => {
      return {
        ...event,
        createdAt: event.createdAt.toLocaleDateString(),
        hourStart: convertMinutesToHourString(event.hourStart),
        hourEnd: convertMinutesToHourString(event.hourEnd),
      };
    })
  );
});

app.listen(3333);
