import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Divider, Paper } from "@mui/material";
import patientService from "../services/patients";
import { Patient } from "../types";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      try {
        const data = await patientService.getById(id);
        setPatient(data);
      } catch (e) {
        console.error(e);
      }
    };

    void fetchPatient();
  }, [id]);

  if (!patient) return <div>Loading patient...</div>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {patient.name}
      </Typography>
      <Typography>
        <strong>SSN:</strong> {patient.ssn}
      </Typography>
      <Typography>
        <strong>Gender:</strong> {patient.gender}
      </Typography>
      <Typography>
        <strong>Date of Birth:</strong> {patient.dateOfBirth}
      </Typography>
      <Typography>
        <strong>Occupation:</strong> {patient.occupation}
      </Typography>

      <Divider style={{ margin: "1em 0" }} />
      <Typography variant="h5">Entries</Typography>
      {patient.entries.length === 0 ? (
        <Typography>No entries yet.</Typography>
      ) : (
        patient.entries.map((entry) => (
          <Paper key={entry.id} style={{ padding: "1em", margin: "0.5em 0" }}>
            <Typography>{entry.date}</Typography>
            <Typography>{entry.description}</Typography>
            <Typography>Specialist: {entry.specialist}</Typography>
            {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
              <Typography>
                Diagnosis Codes: {entry.diagnosisCodes.join(", ")}
              </Typography>
            )}
          </Paper>
        ))
      )}
    </Container>
  );
};

export default PatientPage;
