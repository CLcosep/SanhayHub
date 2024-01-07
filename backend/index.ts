import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import router from './routes';
import cors from 'cors'
import passport from 'passport';
//For env File 
dotenv.config();

// PassportJS Setup
require('./auth/passport'); // loads the rest of the code
require('./microservices/supabase');
const app: Application = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(passport.initialize());
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
})