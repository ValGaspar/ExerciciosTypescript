import express from 'express';
import { errorHandler } from './middleware/erro';
import { retornarPrimeiro } from './utils/generics';

const app = express();

app.use(express.json());

app.get('/teste', (req, res) => {
  const numeros = [10, 20, 30];
  const primeiroNumero = retornarPrimeiro(numeros);
  res.json({ primeiroNumero });
});

// Simulando erro em uma rota
app.get('/erro', (req, res, next) => {
  const erro = new Error('Erro simulado');
  next(erro);  // encaminha para o middleware de erro
});

// Middleware de erro global - sempre por último
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
