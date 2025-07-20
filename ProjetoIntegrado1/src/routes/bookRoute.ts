import express from "express";
import { PrismaClient } from "@prisma/client"; 
const prisma = new PrismaClient();

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello world!");
});

router.post("/livros", async (req, res) => {
    try{
        const { titulo, autor, anoPublicacao, disponivel } = req.body;
    
        const anoAtual = new Date().getFullYear();
        
        if(anoPublicacao > anoAtual){
            res.status(400).json({mensagem: "Ano de Publicação não pode ser no futuro!"});
        }

        const livro = await prisma.livro.create({
            data: {
                titulo,
                autor,
                anoPublicacao,
                disponivel: disponivel ?? false,
            },
        });
    
        res.status(200).json(livro);
    } catch(e){
        console.log(e);
        res.status(500).json({error: "Erro ao criar livro" });
    }
});

router.get("/livros", async (req, res) => {
  try {
    const { disponivel, autor } = req.query;

    const filtro: any = {}; 

    if (disponivel !== undefined) {
      filtro.disponivel = disponivel === "true";
    }

    if(autor !== undefined){
        filtro.autor = String(autor);
    }

    const lista = await prisma.livro.findMany({
      where: filtro,
    });

    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao mostrar livros" });
  }
});

router.patch("/livros/:id/emprestar", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if(isNaN(id)){
            return res.status(400).json({mensagem: "ID inválido."});
        }

        const livro = await prisma.livro.findUnique({
            where: { id: Number(id) },
        });

        if(!livro){
            return res.status(400).json({mensagem: "Livro não encontrado"});
        };

        const disponivel = livro.disponivel;
        if (!disponivel) {
            return res.status(400).json({ mensagem: "Livro indisponível para empréstimo!" });
        }

        const livroAtualizado = await prisma.livro.update({
            where: { id: Number(id) },
            data: { disponivel: false },
        });

        res.json({mensagem: "Livro emprestado com sucesso!", livroAtualizado })
    } catch(e) {
        console.log(e);
        res.status(500).json({mensagem: "Erro ao emprestar livro."});
    }
});

export default router;