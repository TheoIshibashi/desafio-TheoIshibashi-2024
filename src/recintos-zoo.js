class RecintosZoo {

    constructor() {
        this.ANIMAIS = {
            LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false, precisaBiomaMisto: true }
        };

        this.RECINTOS = [
            { numero: 1, bioma: ['savana'], tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: ['floresta'], tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: ['rio'], tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: ['savana'], tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];
    }

    analisaRecintos(animal, quantidade) {
        if (!this.ANIMAIS[animal]) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const detalhesAnimal = this.ANIMAIS[animal];
        let recintosViaveis = [];

       const detalhesAnimal = this.ANIMAIS[animal];
        let recintosViaveis = [];

        this.RECINTOS.forEach(recinto => {
            const biomaOk = detalhesAnimal.bioma.some(biome => recinto.bioma.includes(biome));
            const tamanhoOcupado = recinto.animais.reduce((cont, animalNoRecinto) => cont + (animalNoRecinto.quantidade * this.ANIMAIS[animalNoRecinto.especie].tamanho), 0);
            const espacoLivre = recinto.tamanhoTotal - tamanhoOcupado;

            if (biomaOk && espacoLivre >= (quantidade * detalhesAnimal.tamanho)) {
                if (detalhesAnimal.carnivoro) {
                    if (recinto.animais.some(animal => this.ANIMAIS[animalNoRecinto ].carnivoro) || recinto.animais.length === 0) {
                        return;
                    }
                }

                if (animal === 'HIPOPOTAMO') {
                    if (!recinto.bioma.includes('rio') || !recinto.bioma.includes('savana')) {
                        return;
                    }
                }

                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - (quantidade * detalhesAnimal.tamanho)} total: ${recinto.tamanhoTotal})`);
        }
    });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há nenhum recinto viável." };
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };
