import { Router } from "express";
import { sanitizePetInput, findAll, findOne, add, Update, remove } from "./pet.controler.js";

export const petRouter = Router();

petRouter.get("/", findAll);
petRouter.get("/:id", findOne);
petRouter.post("/", sanitizePetInput, add);
petRouter.put("/:id", sanitizePetInput, Update);
petRouter.patch("/:id", sanitizePetInput, Update);
petRouter.delete("/:id", remove);
