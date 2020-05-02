import express from 'express';
import patients from "../../data/patients"
import patientService from '../services/patientService'
import {toNewPatientEntry, toNewEntry} from '../utils';
import {PatientEntry} from '../types'

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
})


router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
})

router.post('/', (_req, res) => {
  try {
    const newPatienEntry = toNewPatientEntry(_req.body);

    const addedEntry = patientService.addPatientEntry(newPatienEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body)
    const patient = patients.find(p => p.id === req.params.id)

    const addedEntry = patientService.addEntry(patient, newEntry)
    res.json(addedEntry)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

export default router;
