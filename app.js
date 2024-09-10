import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectDB from './database.js';
import Auth from './routes/Auth.js';
import Ticket from './routes/Ticket.js';

const PORT = process.env.PORT || 5000;
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // This handles application/json data
app.use(express.urlencoded({ extended: true })); // This handles URL-encoded data
app.use(cors());

// Routes
app.use('/auth', Auth);
app.use('/ticket', Ticket);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  ConnectDB()
    .then(() => console.log(`Server is running at Port ${PORT}`))
    .catch(() =>
      console.log('Error in connecting to the database. Please check your database configurations')
    );
});
