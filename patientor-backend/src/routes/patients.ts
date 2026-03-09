import express from "express";
import { v1 as uuid } from "uuid";
import patients from "../data/patients";
import { patientSchema, PatientInput } from "../utils/patientUtils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patients);
});

router.get("/:id", (req, res) => {
  const patient = patients.find((p) => p.id === req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({ error: "Patient not found" });
  }
});

router.post("/", (req, res) => {
  try {
    const parsedPatient: PatientInput = patientSchema.parse(req.body);

    const newPatient = {
      id: uuid(),
      ...parsedPatient,
      entries: [],
    };

    patients.push(newPatient);

    res.json(newPatient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send({ error: e.message });
    } else {
      res.status(400).send({ error: "Unknown error" });
    }
  }
});

export default router;
