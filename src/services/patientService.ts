import patients from '../../data/patients'
import {NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types'

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addEntry = (entry: NewPatientEntry): PatientEntry  => {

  const newPatienEntry = {
    id: String(patients.length + 1),
    ...entry
  }

  patients.push(newPatienEntry);
  return newPatienEntry;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find(p => p.id === id)
  return entry
}

export default {
  getNonSensitiveEntries,
  addEntry,
  findById
};
