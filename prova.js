const herois = ["Thorin", "Lyra", "Kael", "Mira"];
const classes = ["guerreiro", "maga", "arqueiro", "curandeira"];
let vidas = [120, 80, 95, 90];
const ataques = [18, 25, 20, 10];
const nomeBoss = "Dragão Vermelho";
const ataqueBoss = 80;
let vidaBoss = 650;
let rodada = 0
let bossDerrotado = false;
let danoTotal = [0, 0, 0, 0];

//QUESTÃO 2
function calcularDano(ataque, classe, rodada) {
    switch (classe) {
        case "guerreiro": 
            return ataque + 5;
        break
        case "maga":
            return ataque * 2;
        break
        case "arqueiro":
            return (rodada % 2 === 0) ? ataque * 2 : ataque;
        break
        default: return 0;
        break
    }
}

//QUESTÃO 3
function indiceMaiorVida(vidas) {
  let indice = -1;
  for (let i = 0; i < vidas.length; i++) {
    if (vidas[i] > 0 && (indice === -1 || vidas[i] > vidas[indice])) {
      indice = i;
    }
  }
  return indice;
} 

//QUESTÃO 4
const contarVivos = (vidas) => vidas.filter(vida => vida > 0);

// const mostrarStatus = function(herois) {
//   herois.forEach((heroi, index) => {
//     console.log(`${heroi} (${classes[index]}): ${vidas[index]} de vida | Vida do Boss = ${vidaBoss}`)
//   }
// )}
const mostrarStatus = () => {
    herois.forEach((heroi, indice) => {
        console.log(`${heroi} (${classes[indice]}): ${vidas[indice]} de vida.`);
      console.log(`Vida do ${nomeBoss}: ${vidaBoss} de vida`)
    });
}


let dano = 0;
//QUESTÂO 5
// while (contarVivos(vidas) > 0 && vidaBoss > 0){
//     rodada++;
//     console.log(`======= RODADA ${rodada} =======`);
//     for (let i = 0; i < herois.length; i++) {
            
//             const cura = 10
//             vidas[i] += cura;
//             dano = calcularDano(ataques[i], classes[i], rodada, );
//             danoTotal[i] += dano;    
//             console.log(`${herois[i]} (${classes[i]}) atacou o ${nomeBoss} causando ${dano} de dano e recebeu ${cura} de vida.`);
//         }
//         vidaBoss -= dano;
        
//     }     

while (vidaBoss > 0 && contarVivos(vidas).length > 0) {
  rodada++;
  console.log("========== RODADA " + rodada + " ==========");
  for (let i = 0; i < herois.length; i++) {
    if (vidas[i] > 0) {
      if (classes[i] === "curandeira") {
        for (let j = 0; j < vidas.length; j++) {
          if (vidas[j] > 0) {
            vidas[j] += 10;
          }
        }
        console.log(herois[i] + " curou todos os heróis vivos em 10.");
      } else {
        const dano = calcularDano(ataques[i], classes[i], rodada);
        vidaBoss -= dano;
        danoTotal[i] += dano;
        console.log(herois[i] + " causou " + dano + " de dano.");
      }
    }
  }
  if (vidaBoss > 0) {
    const alvo = indiceMaiorVida(vidas);
    vidas[alvo] -= ataqueBoss;
    console.log(nomeBoss + " atacou " + herois[alvo] + " com " + ataqueBoss + " de dano!");
    console.log("---------------<STATUS>---------------")
mostrarStatus()
  }
}
console.log("__________________________")

//QUESTAO 6
const bossMorto = vidaBoss <= 0 ? 0 : vidaBoss;
  console.log("Boss foi derrotado pois chegou a " + bossMorto + " de vida.");

for (let i = 0; i < danoTotal.length; i++) {
    if (danoTotal[i] === Math.max(...danoTotal)) {
      console.log("O herói MVP que mais causou dano foi " + herois[i] + " com " + danoTotal[i] + " de dano.");
    }
}

const textosDano = danoTotal.map((dano, index) => `${herois[index]}: ${dano} de dano`);
textosDano.forEach(texto => console.log(texto));

if (vidaBoss <= 0 && contarVivos(vidas).length > 0){
  console.log(`VITÓRIA PERFEITA em ${rodada} rodadas!`)
} else if (vidaBoss <= 0 && contarVivos(vidas).length > 0) {
  console.log(`VITÓRIA em ${rodada} rodadas, mas com baixas.`)
}else {
  console.log(`DERROTA... O ${nomeBoss} venceu.`)
}