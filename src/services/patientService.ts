import patients from '../../data/patients'
import {NonSensitivePatientEntry, PatientEntry, NewPatientEntry, newEntry, Entry } from '../types'

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatientEntry = (entry: NewPatientEntry): PatientEntry  => {

  const newPatienEntry = {
    id: String(patients.length + 1),
    ...entry,
    entries: []
  }

  patients.push(newPatienEntry);
  return newPatienEntry;
};

const addEntry = (patient: PatientEntry, entry: newEntry): Entry => {
  const newEntry: Entry = {
    type: "Hospital",
    id: String(Math.floor(Math.random() * 1000000)),
    ...entry
  }
  patient.entries.push(newEntry)
  return newEntry
}

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find(p => p.id === id)
  return entry
}

export default {
  getNonSensitiveEntries,
  addPatientEntry,
  findById,
  addEntry
};
