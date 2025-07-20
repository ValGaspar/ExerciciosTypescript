// Exercício 1.3 Interfaces
// Definindo a interface Pessoa
// a interface especifica a forma que um objeto específico deve seguir.
interface Pessoa {
  nome: string;
  email?: string; 
  idade: number;
}


const pessoa1: Pessoa = {
  nome: "Ana Souza",
  idade: 28,
  email: "ana.souza@example.com"
};

// Outro exemplo
const pessoa2: Pessoa = {
  nome: "Carlos Lima",
  idade: 35
};

console.log(pessoa1);
console.log(pessoa2);
