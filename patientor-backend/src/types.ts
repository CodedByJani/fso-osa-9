// src/types.ts
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string; // optional
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string; // you can use string for now
  occupation: string;
}

export type NonSensitivePatient = Omit<Patient, "ssn">;
