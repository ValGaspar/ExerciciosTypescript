import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const statusCode = err.statusCode || 500;
  const mensagem = err.mensagem || 'Erro interno do servidor';

  res.status(statusCode).json({
    error: mensagem,
    code: statusCode
  });
}
