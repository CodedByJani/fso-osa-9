import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import type { Entry } from "../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: Omit<Entry, "id">) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [type, setType] = useState<
    "Hospital" | "OccupationalHealthcare" | "HealthCheck"
  >("Hospital");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(0);

  const handleSubmit = () => {
    let newEntry: any = { type, description, date, specialist };

    if (type === "Hospital")
      newEntry.discharge = { date: dischargeDate, criteria: dischargeCriteria };
    if (type === "OccupationalHealthcare") {
      newEntry.employerName = employerName;
      if (sickLeaveStart && sickLeaveEnd)
        newEntry.sickLeave = {
          startDate: sickLeaveStart,
          endDate: sickLeaveEnd,
        };
    }
    if (type === "HealthCheck") newEntry.healthCheckRating = healthCheckRating;

    onSubmit(newEntry);
    setDescription("");
    setDate("");
    setSpecialist("");
    setEmployerName("");
    setSickLeaveStart("");
    setSickLeaveEnd("");
    setDischargeDate("");
    setDischargeCriteria("");
    setHealthCheckRating(0);
  };

  return (
    <Modal open={modalOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          p: 4,
        }}
      >
        <Typography variant="h6">Add Entry</Typography>

        {error && <Typography color="error">{error}</Typography>}

        <TextField
          select
          fullWidth
          margin="dense"
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value as any)}
        >
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            OccupationalHealthcare
          </MenuItem>
          <MenuItem value="HealthCheck">HealthCheck</MenuItem>
        </TextField>

        <TextField
          fullWidth
          margin="dense"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Specialist"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />

        {type === "Hospital" && (
          <>
            <TextField
              fullWidth
              margin="dense"
              label="Discharge Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Discharge Criteria"
              value={dischargeCriteria}
              onChange={(e) => setDischargeCriteria(e.target.value)}
            />
          </>
        )}

        {type === "OccupationalHealthcare" && (
          <>
            <TextField
              fullWidth
              margin="dense"
              label="Employer Name"
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Sick Leave Start"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={sickLeaveStart}
              onChange={(e) => setSickLeaveStart(e.target.value)}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Sick Leave End"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={sickLeaveEnd}
              onChange={(e) => setSickLeaveEnd(e.target.value)}
            />
          </>
        )}

        {type === "HealthCheck" && (
          <TextField
            fullWidth
            margin="dense"
            label="Health Check Rating"
            type="number"
            inputProps={{ min: 0, max: 3 }}
            value={healthCheckRating}
            onChange={(e) => setHealthCheckRating(Number(e.target.value))}
          />
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Add
        </Button>
      </Box>
    </Modal>
  );
};

export default AddEntryModal;
