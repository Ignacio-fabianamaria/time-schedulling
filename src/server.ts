import express, { Application } from 'express';

const app:Application = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.listen(3000, ()=> console.log('server is running'));
