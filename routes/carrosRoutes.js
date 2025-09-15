import express from "express";
import { createCarro, deleteCarros, getAllcarros, updateCarros, getCarrosByld } from "../controllers/carrosController.js";

const router = express.Router();

router.get("/", getAllcarros);
router.get("/:id", getCarrosByld);
router.post("/", createCarro);
router.put("/:id", updateCarros);
router.delete("/:id", deleteCarros);

export default router;