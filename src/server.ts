import express, { Application } from 'express';
import { UsersRoutes } from './routes/users.routes';

const app:Application = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const usersRoutes = new UsersRoutes().getRoutes();

app.use('/users', usersRoutes);

app.listen(3000, ()=> console.log('server is running'));
