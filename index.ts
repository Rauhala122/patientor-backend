import express from 'express';
import diagnosesRouter from './src/routes/diagnoses';
import patientRouter from './src/routes/patients'

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static('build'))

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use("/api/patients", patientRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
