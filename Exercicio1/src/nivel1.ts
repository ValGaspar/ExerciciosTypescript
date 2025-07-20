// 1.1 Tipos Básicos
let nome: string = "Valentina"; 
let idade: number = 17;
let ativo: boolean = true; 

let hobbies: string[] = ["Dormir","Ouvir música","Ver série"];
let ponto: [number, number] = [10, 25];


// 1.2 Funções Tipadas
// retorna o IMC (peso / altura²).
function calcularIMC(peso: number, altura: number){
    let IMC = peso / altura ** 2;
    return IMC;
}

function classificarIMC(IMC: number){
    let situacao: string = "";
    if(IMC <= 19.1){
        situacao = "Abaixo do peso";
    } else if(IMC > 19.1 && IMC < 25.8){
        situacao = "Peso normal";
    } else if(IMC > 25.9 && IMC < 27.3){
        situacao = "Pouco Acima do peso";
    } else if(IMC > 27.4 && IMC < 32.3){
        situacao = "Acima do peso";
    } else if(IMC > 34.4){
        situacao = "Obesidade";
    }
    return situacao;
}


console.log(`IMC = ${calcularIMC(65, 1.65)}, situação: ${classificarIMC(calcularIMC(65, 1.64))}`)