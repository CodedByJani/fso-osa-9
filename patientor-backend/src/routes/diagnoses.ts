// src/routes/diagnoses.ts
import express from "express";
import diagnosesData from "../data/diagnoses";
import { Diagnosis } from "../types";

const router = express.Router();

// GET /api/diagnoses
router.get("/", (_req, res) => {
  res.json(diagnosesData as Diagnosis[]);
});

export default router;
