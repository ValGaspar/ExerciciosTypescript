// 5.3 Decorators
function logTempoExecucao(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const metodoOriginal = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const inicio = performance.now();
    const resultado = metodoOriginal.apply(this, args);
    const fim = performance.now();
    console.log(`Método ${propertyKey} executado em ${(fim - inicio).toFixed(2)}ms`);
    return resultado;
  };

  return descriptor;
}

// 2.1 Classe Carro
class Carro {
	marca: string;
	modelo: string;
	ano: number;

	constructor(marca:string, modelo:string,ano:number){
		this.marca = marca;
		this.modelo = modelo;
		this.ano = ano;
	}
	
	@logTempoExecucao
	obterDetalhes() : string {
		return `Marca ${this.marca} do modelo ${this.modelo} do ano ${this.ano}`;
	}
}

const Parati = new Carro("Parati Surf", "Volkswagen", 1982);
console.log(Parati);
console.log(Parati.obterDetalhes());

// 2.2 Herança
class CarroEletrico extends Carro{
	autonomiaBateria: number;

	constructor(marca:string, modelo:string,ano:number,autonomiaBateria:number){
		super(marca,modelo,ano);
		this.autonomiaBateria = autonomiaBateria;
		}
		obterDetalhes() : string {
			return `${super.obterDetalhes()} com autonomia de bateria ${this.autonomiaBateria} km`;
		}
}

const Tesla = new CarroEletrico("Tesla", "O Model S", 2008, 426);
console.log(Tesla); // Apenas mostra a estrutura
console.log(Tesla.obterDetalhes()); // MOstra a mensagem bonitinha