let seuVotoPara = document.querySelector(".d-1-1 span");
let cargo = document.querySelector(".d-1-2 span");
let descricao = document.querySelector(".d-1-4");
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector(".d-1-right");
let numeros = document.querySelector(".d-1-3");
let votacao = document.querySelector(".options");

let etapaAtual = 0;
let numero = "";
let Votobranco = false;
let votos = [];
let allEtapas = etapas;

comecarEtapa();
function comecarEtapa(){

	numeros.style.display = "block";
	numero = "";
	Votobranco = false;
	let etapa = etapas[etapaAtual];

	let numeroHTML = "";

	for(let i = 1; i < etapa.numeros;i++){
	if(i === 1){
	numeroHTML += '<div class="numero pisca"></div>' 
	}
	numeroHTML += '<div class="numero"></div>' 
	}

	numeros.style.display = "block";
	seuVotoPara.style.display = "none";
	cargo.innerHTML = etapa.titulo;
	descricao.innerHTML = "";
	aviso.style.display.none = "none";
	lateral.innerHTML = "";
	numeros.innerHTML = numeroHTML; 
}

function atualizarInterface(){
	let etapa = etapas[etapaAtual];
	let candidato = etapa.candidatos.filter((item) =>{
		if(item.numero === numero){
			return true;
		}else{
			return false;
		}
	})

	if(candidato.length > 0){
		candidato =  candidato[0];
		seuVotoPara.style.display = "block";
		aviso.style.display = "block";
		descricao.innerHTML = `Nome: ${candidato.name}<br>Partido:${candidato.partido}`;
		let fotosHtml = "";
		for(let i in candidato.fotos){
		if(candidato.fotos[i].small){
		    fotosHtml += `<div class="d-1-images small"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`
		}else
		  {		
	     	fotosHtml += `<div class="d-1-images"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
		  }

		}

		lateral.innerHTML = fotosHtml;
	}else{
		seuVotoPara.style.display = "block";
		aviso.style.display = "block";
		descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
	}

}

function clicou(n){
	let elnumero = document.querySelector(".numero.pisca");
	if(elnumero != null){
		elnumero.innerHTML = n;
		numero = `${numero}${n}`;

		elnumero.classList.remove('pisca');
		if(elnumero.nextElementSibling != null){
		elnumero.nextElementSibling.classList.add('pisca');
		} else{
			atualizarInterface();
		}
	}
}

function Branco(){
if(numero === ""){
		Votobranco = true;
		seuVotoPara.style.display = "block";
		numeros.style.display = "none";
		descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
}else{
	descricao.innerHTML = '<p>Para votar em branco, os campos precisa estar limpos, para isso aperte em corrigir antes</p>';
}
}

function Corrige(){

comecarEtapa();

}

function Confirma(){
	let etapa = etapas[etapaAtual];
	let votoConfirmado = false;
	if(Votobranco === true){
		votos.push({
			etaaapa : etapas[etapaAtual].titulo,
			voto: 'branco'
		})	
		votoConfirmado = true;
	}else if(numero.length == etapa.numeros){
		votos.push({
			etaaapa : etapas[etapaAtual].titulo,
			voto: numero
		})	
	    votoConfirmado = true;
	}

	if(votoConfirmado){
		etapaAtual++;
		if(etapas[etapaAtual] != undefined || etapas[etapaAtual] != null){
			comecarEtapa();
		}else{
			document.querySelector(".tela").innerHTML = '<div class="aviso-gigante pisca">FIM</div>';
		}
	}

}
