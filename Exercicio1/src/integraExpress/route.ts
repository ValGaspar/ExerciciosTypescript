import express from "express";
import validarTarefa from "./validarTarefa";
import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();
const router = express.Router();

// 3.1 Rota de Health Check
router.get("/status", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// 4.1 Query com Filtro
router.get("/tarefas", async (req, res) => {
  const { concluido } = req.query;

  const filtro: any = {
    deletadoEm: null,
  };

  if (concluido !== undefined) {
    filtro.concluida = concluido === 'true';
  }

  const lista = await prisma.tarefa.findMany({
    where: filtro,
  });

  return res.status(200).json(lista);
});

// tarefas
router.post("/tarefas", validarTarefa, async (req, res) => {
  const { titulo, concluido } = req.body;

  const tarefa = await prisma.tarefa.create({
    data: {
      titulo,
      concluida: concluido ?? false,
    },
  });

  res.status(201).json({ mensagem: "Tarefa criada com sucesso", tarefa });
});

// 4.2 Soft Delete
router.delete("/tarefas/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    
    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id },
      data: { deletadoEm: new Date() },
    });

    return res.status(200).json({ mensagem: "Tarefa deletada (soft delete)", tarefa: tarefaAtualizada });
  } catch (error) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }
});


export default router;
