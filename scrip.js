var turno = "X"; // El turno inicial
let pausa = false;
var datos = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
];
function reiniciarB(){

    for(i =0;i<3;i++){
        datos[i].splice(0,datos[i].length," "," "," ");
    }



    console.log(datos);

    turno ="X";
    pausa= false; //Quita la pausa
    const canvas = document.getElementById('can');
    const ctx= canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    dibujando();
};

//dibuja casilla del juego
function dibujando(){
    
    var canvas= document.getElementById('can');

    dibujaLineas(0,100,300,100,canvas);
    dibujaLineas(100,0,100,300,canvas);
    dibujaLineas(200,0,200,300,canvas);
    dibujaLineas(0,200,300,200,canvas);

    clickEvent();
}

function dibujaLineas(x_inicio,y_inicio,x_final,y_final,canvas){
    const linea1=canvas.getContext("2d");
    linea1.beginPath();
    linea1.lineWidth = 5;
    linea1.strokeStyle="black";
    linea1.moveTo(x_inicio,y_inicio);
    linea1.lineTo(x_final,y_final);
    linea1.stroke();
}


function clickEvent() {
    var canvas = document.getElementById('can');
    

    canvas.addEventListener('click', function(event) {
        if (pausa) return; // Si el juego está pausado, no hacer nada

        var xClick = event.offsetX;
        var yClick = event.offsetY;
        var xc = Math.floor(xClick / 100);
        var yc = Math.floor(yClick / 100);
        console.log(xc);
        console.log(yc);

        if (datos[yc][xc] === " ") {
            if (turno === "X") {
                dibujaX(xc * 100, yc * 100, canvas);
                datos[yc][xc] = "X";
                if (comprobarVictoria("X")) {
                    console.log("Gano la X");
                    pausa = true;
                    // Reiniciar el juego o deshabilitar más clics aquí
                }
                turno = "O";
            } else {
                dibujaO(xc * 100, yc * 100, canvas);
                datos[yc][xc] = "O";
                if (comprobarVictoria("O")) {
                    console.log("Gano el O");
                    pausa = true;
                    
                }
               
                turno = "X";
            }
        } else {
            console.log("Casilla ocupada");
        }
    });
}



function dibujaX(x, y, canvas) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth=5;
    ctx.strokeStyle="red";
    ctx.moveTo(x+10, y+10);
    ctx.lineTo(x + 100-10, y + 100-10);

    ctx.moveTo(x + 100-10, y+10);
    ctx.lineTo(x+10, y + 100-10);
    ctx.stroke();
}

function dibujaO(x, y, canvas) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth=5;
    ctx.strokeStyle="green";
    ctx.arc(x + 50, y + 50, 40, 0, Math.PI * 2);
    ctx.stroke();
}

function comprobarVictoria(jugador) {
    // Verifica filas
    for (let i = 0; i < 3; i++) {
        if (datos[i][0] === jugador && datos[i][1] === jugador && datos[i][2] === jugador) {
            return true; 
        }
    }

    // Verifica columnas
    for (let i = 0; i < 3; i++) {
        if (datos[0][i] === jugador && datos[1][i] === jugador && datos[2][i] === jugador) {
            return true;
        }
    }

    // Verifica diagonales
    if (datos[0][0] === jugador && datos[1][1] === jugador && datos[2][2] === jugador) {
        return true; 
    }
    if (datos[0][2] === jugador && datos[1][1] === jugador && datos[2][0] === jugador) {
        return true;
    }

    return false; // No hay victoria
}


dibujando();