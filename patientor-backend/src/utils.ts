import { Gender } from "./types";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export const parsePatient = (data: any) => {
  if (!data || typeof data !== "object") {
    throw new Error("Incorrect or missing data");
  }

  const { name, dateOfBirth, ssn, gender, occupation } = data;

  if (!isString(name)) throw new Error("Incorrect or missing name");
  if (!isString(ssn)) throw new Error("Incorrect or missing ssn");
  if (!isString(occupation)) throw new Error("Incorrect or missing occupation");
  if (!isString(dateOfBirth) || !isDate(dateOfBirth))
    throw new Error("Incorrect or missing dateOfBirth");
  if (!isGender(gender)) throw new Error("Incorrect or missing gender");

  return {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };
};
