import express, { Application, NextFunction, Request, Response } from 'express';
import { UsersRoutes } from './routes/users.routes';
import multer from 'multer';

const app:Application = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const usersRoutes = new UsersRoutes().getRoutes();
const upload = multer();

app.use('/users', upload.any(), usersRoutes);
app.use((err:Error, request:Request, response:Response, next:NextFunction) =>{
    if(err instanceof Error){
        return response.status(400).json({message: err.message});
    }
    return response.status(500).json({message: 'Internal Server Error'});
})

app.listen(3000, ()=> console.log('server is running'));
