import { Router } from "express";
import { sanitizePetInput, findAll, findOne, add, update, remove, findByClientId, findByClientDni } from "./pet.controler.js";

export const petRouter = Router();

petRouter.get("/", findAll);
petRouter.get("/:id", findOne);
petRouter.post("/", sanitizePetInput, add);
petRouter.put("/:id", sanitizePetInput, update);
petRouter.patch("/:id", sanitizePetInput, update);
petRouter.delete("/:id", remove);
petRouter.get('/by-client/:clientId', findByClientId);
petRouter.get('/by-client-dni/:dni', findByClientDni);
