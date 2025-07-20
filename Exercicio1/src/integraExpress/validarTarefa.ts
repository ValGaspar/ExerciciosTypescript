import { Request, Response, NextFunction } from "express";

function validarTarefa(req: Request, res: Response, next: NextFunction) {
  const { titulo } = req.body;

  if (!titulo || typeof titulo !== "string" || titulo.trim() === "") {
    return res.status(400).json({ erro: "Campo 'titulo' é obrigatório e não pode estar vazio." });
  }

  next();
}

export default validarTarefa;
