-- CreateTable
CREATE TABLE "Livro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "anoPublicacao" INTEGER NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true
);
