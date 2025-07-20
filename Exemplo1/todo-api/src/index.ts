import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rota: Listar todas as tarefas
app.get('/tarefas', async (req: Request, res: Response) => {
  try {
    const tarefas = await prisma.tarefa.findMany();
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

// Rota: Criar uma nova tarefa
app.post('/tarefas', async (req: Request, res: Response) => {
  const { titulo, descricao } = req.body;
  if (!titulo) {
    return res.status(400).json({ error: 'Título é obrigatório' });
  }

  try {
    const novaTarefa = await prisma.tarefa.create({
      data: { titulo, descricao, concluida: false },
    });
    res.status(201).json(novaTarefa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
});

// Rota: Atualizar uma tarefa
app.put('/tarefas/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { concluida } = req.body;

  try {
    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id: Number(id) },
      data: { concluida },
    });
    res.json(tarefaAtualizada);
  } catch (error) {
    res.status(404).json({ error: 'Tarefa não encontrada' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em <http://localhost>:${port}`);
});
