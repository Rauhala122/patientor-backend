import { NewPatientEntry, Gender } from './types';

const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseName(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseName(object.occupation)
  }

  return newEntry;
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

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export default toNewPatientEntry;

/* eslint-disable @typescript-eslint/no-explicit-any */
