import { Gender } from "../types";
import type { Patient } from "../types";

const data: Patient[] = [
  {
    id: "d2773336-f723-11e9-8f0b-362b9e155667",
    name: "John McClane",
    dateOfBirth: "1986-07-09",
    ssn: "090786-122X",
    gender: Gender.Male,
    occupation: "New york city cop",
    entries: [],
  },
  {
    id: "d2773598-f723-11e9-8f0b-362b9e155667",
    name: "Martin Riggs",
    dateOfBirth: "1979-01-30",
    ssn: "300179-77A",
    gender: Gender.Male,
    occupation: "Cop",
    entries: [],
  },
  {
    id: "d27736ec-f723-11e9-8f0b-362b9e155667",
    name: "Hans Gruber",
    dateOfBirth: "1970-04-25",
    ssn: "250470-555L",
    gender: Gender.Other,
    occupation: "Technician",
    entries: [],
  },
  {
    id: "d2773822-f723-11e9-8f0b-362b9e155667",
    name: "Dana Scully",
    dateOfBirth: "1974-01-05",
    ssn: "050174-432N",
    gender: Gender.Female,
    occupation: "Forensic Pathologist",
    entries: [],
  },
  {
    id: "d2773c6e-f723-11e9-8f0b-362b9e155667",
    name: "Matti Luukkainen",
    dateOfBirth: "1971-04-09",
    ssn: "090471-8890",
    gender: Gender.Male,
    occupation: "Digital evangelist",
    entries: [],
  },
  {
    id: "l001",
    name: "Lara Croft",
    dateOfBirth: "1990-02-14",
    ssn: "140290-123A",
    gender: Gender.Female,
    occupation: "Archaeologist",
    entries: [
      {
        id: "lc-e1",
        date: "2026-03-05",
        type: "Hospital",
        specialist: "Dr. Jones",
        description: "Treated for sprained ankle after a tomb exploration.",
        diagnosisCodes: ["S03.5"],
        discharge: {
          date: "2026-03-07",
          criteria: "Patient can walk normally",
        },
      },
      {
        id: "lc-e2",
        date: "2026-03-08",
        type: "OccupationalHealthcare",
        specialist: "Dr. Smith",
        description: "Back pain from carrying heavy artifacts.",
        employerName: "Archaeology Institute",
        diagnosisCodes: ["M24.2"],
        sickLeave: {
          startDate: "2026-03-09",
          endDate: "2026-03-12",
        },
      },
      {
        id: "lc-e3",
        date: "2026-03-10",
        type: "HealthCheck",
        specialist: "Dr. Who",
        description: "Routine health checkup.",
        healthCheckRating: 0,
        diagnosisCodes: [],
      },
    ],
  },
];

export default data;
