import express from 'express';
import apiRoutes from './api/routes';

const app = express();
const port = 3000;

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});