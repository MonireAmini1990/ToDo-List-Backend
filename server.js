import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './src/routes/usersRoutes.js';
import taskRouter from './src/routes/taskRoutes.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
  credentials: true
}));

 app.options('*', cors({
  origin: 'http://localhost:5173',
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
  credentials: true
}));

 app.use(express.json());

 
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);


app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});