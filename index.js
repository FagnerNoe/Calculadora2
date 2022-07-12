'use strict';

const display = document.getElementById('display'); /*pega o valor do elemnto(display) pelo id dele no html */
const numeros = document.querySelectorAll('[id*=tecla]');/*Cria um array Node list e captura qualquer id que contem a palavra(tecla no caso)*/
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador != undefined;

const calcular = () => {
    if (operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));  /* Conversao sendo feita pra float pra nao occorer o erro de concactenar */ 
        novoNumero = true;
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);  /* eval traz mesmo resultado que if/else porém com uma linha somente */
        atualizarDisplay(resultado);
       
       /* if(operador == '+'){
            atualizarDisplay(numeroAnterior + numeroAtual);
        }else if (operador == '-'){
            atualizarDisplay(numeroAnterior - numeroAtual);   **Dessa forma  pra realizar as operações**
        }else if (operador == '*'){
            atualizarDisplay(numeroAnterior * numeroAtual);
        }else if (operador == '/'){
            atualizarDisplay(numeroAnterior / numeroAtual);
        }       */ 
    }
}
const atualizarDisplay = (texto) =>{
    if(novoNumero){
        display.textContent = texto.toLocaleString('BR') /* Alterando pra regiao do Brasil alterando ponto decimal em virgula */
        novoNumero = false;
    }else{
        display.textContent += texto.toLocaleString('BR');  /*Concatenando com proximo numero digitado */
    }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach(numero => numero.addEventListener('click',inserirNumero));       

const selecionarOperador = (evento) =>{
if(!novoNumero){  /* exclamação como negação .....se nao for numeroNvo rodará o if */
    calcular();
    novoNumero = true;
    operador = evento.target.textContent;
    numeroAnterior =parseFloat(display.textContent.replace(',','.'));
}
}
operadores.forEach(operador => operador.addEventListener('click',selecionarOperador));

const ativarIgual = () => {
    calcular();
    operador = undefined;
}
document.getElementById('igual').addEventListener('click',ativarIgual);


const zerarDisplay = () => display.textContent = '';
document.getElementById('zerarDisplay').addEventListener('click',zerarDisplay);

const zerarCalculo = () => {   
    zerarDisplay();
    operador = undefined;
    novoNumero = 0;
    numeroAnterior = undefined;
}
document.getElementById('zerarCalculo').addEventListener('click',zerarCalculo);

const voltarCasa = () => display.textContent = display.textContent.slice(0 ,-1);
document.getElementById('voltarCasa').addEventListener('click',voltarCasa);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click',inverterSinal);

const existeDecimal = () => display.textContent.indexOf(',') != -1;
const existeValor = () => display.textContent.length > 0;


const inserirDecimal = () =>{
    if (!existeDecimal()){
        if (existeValor()){
            atualizarDisplay(',');
        }else{
            atualizarDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click',inserirDecimal);

const mapaTeclado = {
    '0'      : 'tecla0',
    '1'     : 'tecla1',
    '2'     : 'tecla2',
    '3'     : 'tecla3',
    '4'     : 'tecla4',
    '5'     : 'tecla5',
    '6'     : 'tecla6',
    '7'     : 'tecla7',
    '8'     : 'tecla8',
    '9'     : 'tecla9',
    '/'     : 'operadorDivisao',
    '*'     : 'operadorMultiplicar',
    '-'         : 'operadorSubtracao',
    '+'         : 'operadorAdicionar',
    '='         : 'igual',
    'Enter'     : 'igual',
    'Backspace' : 'voltarCasa',
    'c'         : 'zerarDisplay',
    'Escape'    : 'zerarCalculo',
    ','         : 'decimal',
    '.'         : 'decimal'

}

const mapearTeclado = (evento) =>{
    const tecla = evento.key;

    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1;
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
}

document.addEventListener('keydown',mapearTeclado);
