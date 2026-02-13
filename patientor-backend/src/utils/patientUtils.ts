import { z } from "zod";
import { Gender } from "../types";

export const patientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export type PatientInput = z.infer<typeof patientSchema>;
