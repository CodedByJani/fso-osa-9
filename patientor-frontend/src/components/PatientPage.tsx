import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Divider, Paper, Button } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";

import patientService from "../services/patients";
import type { Patient, Entry } from "../types";
import AddEntryModal from "./AddEntryModal";

interface PatientPageProps {}

const PatientPage = ({}: PatientPageProps) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string>();

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

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (entry: Omit<Entry, "id">) => {
    if (!id) return;
    try {
      const newEntry = await patientService.addEntry(id, entry);
      setPatient(
        patient
          ? { ...patient, entries: patient.entries.concat(newEntry) }
          : null,
      );
      closeModal();
    } catch (e: unknown) {
      setError("Failed to add entry");
    }
  };

  const renderIcon = (entryType: Entry["type"]) => {
    switch (entryType) {
      case "Hospital":
        return <LocalHospitalIcon sx={{ ml: 1 }} />;
      case "OccupationalHealthcare":
        return <WorkIcon sx={{ ml: 1 }} />;
      case "HealthCheck":
        return <FavoriteIcon sx={{ ml: 1 }} />;
      default:
        return null;
    }
  };

  if (!patient) return <div>Loading patient...</div>;

  return (
    <Container>
      <Typography variant="h4">{patient.name}</Typography>
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

      <Divider sx={{ my: 2 }} />
      <Typography variant="h5">Entries</Typography>
      {patient.entries.length === 0 ? (
        <Typography>No entries yet.</Typography>
      ) : (
        patient.entries.map((entry) => (
          <Paper key={entry.id} sx={{ p: 2, my: 1 }}>
            <Typography>
              {entry.date} - {entry.description} {renderIcon(entry.type)}
            </Typography>
            <Typography>Specialist: {entry.specialist}</Typography>
            {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
              <ul>
                {entry.diagnosisCodes.map((code) => (
                  <li key={code}>{code}</li>
                ))}
              </ul>
            )}
          </Paper>
        ))
      )}

      <Button variant="contained" sx={{ mt: 2 }} onClick={openModal}>
        Add New Entry
      </Button>

      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error={error}
      />
    </Container>
  );
};

export default PatientPage;
