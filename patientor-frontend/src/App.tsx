import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import type { Patient, Diagnosis } from "./types";

import patientService from "./services/patients";
import diagnosesService from "./services/diagnoses";

import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const patientsData = await patientService.getAll();
      setPatients(patientsData);
    };

    void fetchPatients();
  }, []);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnosesData = await diagnosesService.getAll();
      setDiagnoses(diagnosesData);
    };

    void fetchDiagnoses();
  }, []);

  return (
    <Router>
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>

        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>

        <Divider hidden />

        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />

          <Route
            path="/patients/:id"
            element={<PatientPage diagnoses={diagnoses} />}
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
