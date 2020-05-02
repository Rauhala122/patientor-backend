import { NewPatientEntry, Gender, Entry, DiagnoseEntry, newEntry, EntryType } from './types';

export const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseName(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseName(object.occupation)
  }

  return newEntry;
}

const assertNever = (value: newEntry): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const toNewEntry = (object: any): newEntry => {

  const baseEntry: newEntry = {
    type: object.type,
    description: parseName(object.description),
    date: parseDate(object.date),
    specialist: parseName(object.specialist),
    diagnosisCodes: object.diagnosisCodes,
  }

  switch (object.type) {
    case "Hospital":
      const hospitalEntry = {
        ...baseEntry,
        discharge: object.discharge
      }

      return hospitalEntry
    case "HealthCheck":
      const healthCheckEntry = {
        ...baseEntry,
        healthCheckRating: object.healthCheckRating
      }
      return healthCheckEntry
    case "OccupationalHealthcare":
      const occupationalEntry = {
        ...baseEntry,
        employerName: object.employerName,
        sickLeave: object.sickLeave
      }
      return occupationalEntry
    default:
      return assertNever(object)
  }
}

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
}

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name: " + name);
  }
  return name;
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: any): string => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender)
  }

  return gender
}

const parseEntryType = (type: any): Entry => {
  if (!type || !isString(type) || !isEntryType(type)) {
    throw new Error("Incorrect or missing type: " + type)
  }
  return type
}

const isEntryType = (param: any): param is Entry => {
  return ["Hospital", "OccupationalHealthcare", "HealthCheck"].includes(param)
}

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};


/* eslint-disable @typescript-eslint/no-explicit-any */
