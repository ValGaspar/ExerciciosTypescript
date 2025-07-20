// Niveis 3 e 4
import express from 'express';
import route from './route';  

const app = express();

app.use(express.json()); 

app.use(route);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
