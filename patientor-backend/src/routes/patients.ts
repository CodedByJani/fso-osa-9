import express from "express";
import { v1 as uuid } from "uuid";
import patients from "../data/patients";
import type {
  Patient,
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  Diagnosis,
} from "../types";

const router = express.Router();

// Helper: parse diagnosis codes safely
const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [];
  }
  return (
    (object as { diagnosisCodes?: Array<Diagnosis["code"]> }).diagnosisCodes ||
    []
  );
};

/* ------------------------------
   GET /api/patients
-------------------------------- */
router.get("/", (_req, res) => {
  res.json(patients);
});

/* ------------------------------
   GET /api/patients/:id
-------------------------------- */
router.get("/:id", (req, res) => {
  const patient = patients.find((p) => p.id === req.params.id);
  if (!patient) return res.status(404).send({ error: "Patient not found" });
  res.json(patient);
});

/* ------------------------------
   POST /api/patients
-------------------------------- */
router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  if (!name || !dateOfBirth || !ssn || !gender || !occupation) {
    return res.status(400).send({ error: "Missing required patient fields" });
  }

  const newPatient: Patient = {
    id: uuid(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries: [],
  };

  patients.push(newPatient);
  res.json(newPatient);
});

/* ------------------------------
   POST /api/patients/:id/entries
-------------------------------- */
router.post("/:id/entries", (req, res) => {
  const patient = patients.find((p) => p.id === req.params.id);
  if (!patient) return res.status(404).send({ error: "Patient not found" });

  const { type, description, date, specialist, diagnosisCodes, ...rest } =
    req.body;

  if (!type || !description || !date || !specialist) {
    return res.status(400).send({ error: "Missing required entry fields" });
  }

  let newEntry: Entry;

  switch (type) {
    case "Hospital":
      newEntry = {
        id: uuid(),
        type: "Hospital",
        description,
        date,
        specialist,
        diagnosisCodes: parseDiagnosisCodes({ diagnosisCodes }),
        discharge: rest.discharge,
      } as HospitalEntry;
      break;

    case "OccupationalHealthcare":
      newEntry = {
        id: uuid(),
        type: "OccupationalHealthcare",
        description,
        date,
        specialist,
        diagnosisCodes: parseDiagnosisCodes({ diagnosisCodes }),
        employerName: rest.employerName,
        sickLeave: rest.sickLeave
          ? {
              startDate: rest.sickLeave.startDate,
              endDate: rest.sickLeave.endDate,
            }
          : undefined,
      } as OccupationalHealthcareEntry;
      break;

    case "HealthCheck":
      newEntry = {
        id: uuid(),
        type: "HealthCheck",
        description,
        date,
        specialist,
        diagnosisCodes: parseDiagnosisCodes({ diagnosisCodes }),
        healthCheckRating: rest.healthCheckRating,
      } as HealthCheckEntry;
      break;

    default:
      return res.status(400).send({ error: `Invalid entry type: ${type}` });
  }

  patient.entries.push(newEntry);
  res.json(newEntry);
});

export default router;
