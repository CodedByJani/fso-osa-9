import { Typography, Box } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Entry, HealthCheckRating } from "../types";

interface EntryDetailsProps {
  entry: Entry;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const HealthRatingIcon = ({ rating }: { rating: HealthCheckRating }) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon style={{ color: "green" }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon style={{ color: "yellow" }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon style={{ color: "orange" }} />;
    case HealthCheckRating.CriticalRisk:
      return <FavoriteIcon style={{ color: "red" }} />;
    default:
      return null;
  }
};

const EntryDetails = ({ entry }: EntryDetailsProps) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Box border={1} borderRadius={2} padding={1} marginY={1}>
          <Typography>
            <LocalHospitalIcon /> {entry.date} - {entry.description}
          </Typography>
          <Typography>Specialist: {entry.specialist}</Typography>
          <Typography>
            Discharge: {entry.discharge.date}, criteria:{" "}
            {entry.discharge.criteria}
          </Typography>
          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          )}
        </Box>
      );
    case "OccupationalHealthcare":
      return (
        <Box border={1} borderRadius={2} padding={1} marginY={1}>
          <Typography>
            <WorkIcon /> {entry.date} - {entry.description}
          </Typography>
          <Typography>Specialist: {entry.specialist}</Typography>
          <Typography>Employer: {entry.employerName}</Typography>
          {entry.sickLeave && (
            <Typography>
              Sick leave: {entry.sickLeave.startDate} -{" "}
              {entry.sickLeave.endDate}
            </Typography>
          )}
          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          )}
        </Box>
      );
    case "HealthCheck":
      return (
        <Box border={1} borderRadius={2} padding={1} marginY={1}>
          <Typography>
            <FavoriteIcon /> {entry.date} - {entry.description}
          </Typography>
          <Typography>Specialist: {entry.specialist}</Typography>
          <Typography>
            Health rating: <HealthRatingIcon rating={entry.healthCheckRating} />
          </Typography>
          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          )}
        </Box>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
