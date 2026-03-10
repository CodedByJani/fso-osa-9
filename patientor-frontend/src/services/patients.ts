import axios from "axios";
import type { Patient, PatientFormValues, Entry } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async (): Promise<Patient[]> => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return data;
};

const create = async (object: PatientFormValues): Promise<Patient> => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);
  return data;
};

const getById = async (id: string): Promise<Patient> => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const addEntry = async (
  patientId: string,
  entry: Omit<Entry, "id">,
): Promise<Entry> => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    entry,
  );
  return data;
};

export default {
  getAll,
  create,
  getById,
  addEntry,
};
