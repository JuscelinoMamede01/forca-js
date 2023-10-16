const palavrasAleatorias = [
  { palavra: "ABACAXI", dica: "Uma fruta tropical amarela e doce." },
  { palavra: "BICICLETA", dica: "Um meio de transporte com duas rodas." },
  {
    palavra: "COMPUTADOR",
    dica: "Uma máquina usada para processamento de informações.",
  },
  { palavra: "ELEFANTE", dica: "Um animal terrestre gigante com tromba." },
  { palavra: "FUTEBOL", dica: "Um esporte jogado com uma bola e pés." },
  { palavra: "GIRASSOL", dica: "Uma flor amarela que segue o sol." },
  { palavra: "HAMBURGUER", dica: "Um tipo de sanduíche com carne e pão." },
  { palavra: "IGREJA", dica: "Um local de culto religioso." },
  { palavra: "JANELA", dica: "Uma abertura em uma parede com vidro." },
  { palavra: "KIWI", dica: "Uma fruta pequena e verde." },
  { palavra: "LAPIS", dica: "Uma ferramenta para escrever ou desenhar." },
  { palavra: "MACACO", dica: "Um primata encontrado em florestas." },
  { palavra: "NUVEM", dica: "Uma massa de água no céu." },
  { palavra: "OCEANO", dica: "Uma vasta extensão de água salgada." },
  { palavra: "PIANO", dica: "Um instrumento musical de teclas." },
  {
    palavra: "QUADRADO",
    dica: "Uma forma geométrica com quatro lados iguais.",
  },
  { palavra: "RATO", dica: "Um pequeno roedor." },
  { palavra: "SORVETE", dica: "Uma sobremesa gelada e doce." },
  { palavra: "TELEFONE", dica: "Um dispositivo para comunicação por voz." },
  { palavra: "UNICORNIO", dica: "Um ser mitológico com um chifre na testa." },
];

const dicaElement = document.getElementById("dica");
const palavraElement = document.getElementById("palavra");
let iniciarJogoButton = document.getElementById("iniciarJogo");
const novaPalavraButton = document.getElementById("novaPalavra");
novaPalavraButton.style.display = "none";
let tentativas = 6;
let palavraSorteada = null;

function sortearPalavra() {
  const indiceSorteado = Math.floor(Math.random() * palavrasAleatorias.length);
  palavraSorteada = palavrasAleatorias[indiceSorteado];
  const palavraComUnderscores = "_".repeat(palavraSorteada.palavra.length);
  dicaElement.textContent = palavraSorteada.dica;
  palavraElement.textContent = palavraComUnderscores;
}

function iniciarJogo() {
  sortearPalavra();
  iniciarJogoButton.style.display = "none";
  novaPalavraButton.style.display = "block";
}

function novaPalavra(id) {
  sortearPalavra();

  // Obtenha todos os elementos de botão (letras do teclado)
  const buttons = document.querySelectorAll(".keyboard button");

  // Remova a classe "disabled" de todos os botões
  buttons.forEach((button) => {
    button.classList.remove("disabled");
  });

  // Redefina o número de tentativas para 6 a cada nova palavra
  tentativas = 6;
  document.getElementById(
    "tentativas"
  ).textContent = `Tentativas restantes: ${tentativas}`;
}

iniciarJogoButton.addEventListener("click", iniciarJogo);
novaPalavraButton.addEventListener("click", novaPalavra);

function disableButton(id) {
  document.getElementById(id).classList.add("disabled");
}

function encontrarLetra(letra) {
  console.log(`Letra clicada: ${letra}`);
  disableButton(letra);

  const palavra = palavraSorteada.palavra;
  let palavraExibida = palavraElement.textContent;
  let acertou = false;

  for (let i = 0; i < palavra.length; i++) {
    if (palavra[i].toLowerCase() === letra.toLowerCase()) {
      palavraExibida =
        palavraExibida.substr(0, i) + letra + palavraExibida.substr(i + 1);
      acertou = true;
    }
  }

  palavraElement.textContent = palavraExibida;

  if (acertou === false) {
    tentativas--;
    document.getElementById(
      "tentativas"
    ).textContent = `Tentativas restantes: ${tentativas}`;

    if (tentativas === 0) {
      window.alert("Você Perdeu!");
    }
  } else if (palavraExibida.replace(/ /g, "") === palavra) {
    window.alert("Você Venceu!");
  }
}

/**
 * Generates a virtual keyboard from A-Z in HTML.
 */
function generateKeyboard() {
  const mainElement = document.querySelector(".keyboard");

  for (let i = 65; i < 91; i++) {
    const letter = String.fromCharCode(i);
    const buttonElement = `<button id="${letter}" onclick="encontrarLetra('${letter}')" type="button" class="btn btn-primary">${letter}</button>`;

    mainElement.innerHTML += buttonElement;
  }
}

generateKeyboard();
