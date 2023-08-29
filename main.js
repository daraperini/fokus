const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const musicaFocoImput = document.querySelector("#alternar-musica");
const startPauseBt = document.querySelector("#start-pause");
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const imagemBtIniciarOuPausar = document.querySelector("#start-pause img");
const tempoNaTela = document.querySelector("#timer");
const audioPlay = new Audio("sons/play.wav");
const audioPause = new Audio("sons/pause.mp3");
const audioTempoFinalizado = new Audio("sons/beep.mp3");
const musica = new Audio("sons/luna-rise-part-one.mp3"); //objeto do JS instância do tipo Audio

let tempoDecorridoEmSegundos = 1500; //25min = 1500seg
let intervaloId = null;

musica.loop = true;

musicaFocoImput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempo();
  botoes.forEach((contexto) => {
    contexto.classList.remove("active");
  });

  html.setAttribute("data-contexto", contexto); //seleciona o atributo que quer modificar, passa o novo valor
  banner.setAttribute("src", `imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `
    Otimize sua produtividade,<br />
    <strong class="app__title-strong">mergulhe no que importa.</strong>
    `;
      break;

    case "descanso-curto":
      titulo.innerHTML = `
    Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
    `;
      break;

    case "descanso-longo":
      titulo.innerHTML = `
    Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>
    `;
      break;
    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    audioTempoFinalizado.play();
    alert("Tempo finalizado!");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};

startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    zerar();
    audioPause.play();
    return;
  }
  intervaloId = setInterval(contagemRegressiva, 1000); //qual método a ser executado, tempo de execução (em milissegundos)
  audioPlay.play();
  iniciarOuPausarBt.textContent = "Pausar";
  imagemBtIniciarOuPausar.setAttribute("src", "imagens/pause.png");
}

function zerar() {
  clearInterval(intervaloId);
  iniciarOuPausarBt.textContent = "Começar";
  imagemBtIniciarOuPausar.setAttribute("src", "imagens/play_arrow.png");
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000); //instância do objeto JS Date que oferece métodos para formatar tempo. *1000 = transforma o tempo decorrido em seg em milissegundos
  const tempoFormatado = tempo.toLocaleString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
