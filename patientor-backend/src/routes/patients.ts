import express from "express";
import patients from "../data/patients";
import { NonSensitivePatient } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  const nonSensitivePatients: NonSensitivePatient[] = patients.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }),
  );
  res.json(nonSensitivePatients);
});

export default router;
