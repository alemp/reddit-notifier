import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT;

/**
 * Starts the server
 */
app.listen(PORT, () => {
  console.log('Service started and listening on port ' + PORT);
});
