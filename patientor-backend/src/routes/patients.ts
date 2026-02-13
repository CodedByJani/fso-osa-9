import express from "express";
import { v1 as uuid } from "uuid";
import patients from "../data/patients";
import { patientSchema, PatientInput } from "../utils/patientUtils";

const router = express.Router();

router.post("/", (req, res) => {
  try {
    // Validate input
    const parsedPatient: PatientInput = patientSchema.parse(req.body);

    // Create new patient object
    const newPatient = {
      id: uuid(),
      ...parsedPatient,
    };

    // Add to in-memory data
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
