class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let puntos = [];
let mostrarCentroid = false;
let centroide;

function setup() {
    createCanvas(400, 400);
    // Generar un número aleatorio de puntos entre 3 y 20
    let numPuntos = Math.floor(random(3, 21)); // Generar un número entero entre 3 y 20
    generarPuntosAleatorios(numPuntos); 
    calcularCentroide();
    analizarConvexidad();
}

function draw() {
    background(220);
    translate(width / 2, height / 2); // Centrar el sistema de coordenadas

    // Dibujar la figura
    fill(200, 200, 255); // Color para la figura
    beginShape();
    for (let punto of puntos) {
        vertex(punto.x * 40, punto.y * -40);
    }
    endShape(CLOSE);

    // Dibujar los puntos
    fill(0); // Color para los puntos
    for (let punto of puntos) {
        ellipse(punto.x * 40, punto.y * -40, 10, 10); // Multiplicar para escalado
    }

    // Mostrar el centroide si se ha activado
    if (mostrarCentroid) {
        fill('red');
        ellipse(centroide.x * 40, centroide.y * -40, 10, 10);
        stroke('red');
        for (let punto of puntos) {
            line(centroide.x * 40, centroide.y * -40, punto.x * 40, punto.y * -40);
        }
    }
}

function generarPuntosAleatorios(numPuntos) {
    puntos = []; // Reiniciar la lista de puntos
    for (let i = 0; i < numPuntos; i++) {
        // Generar puntos aleatorios en el rango [-2, 2] para evitar un área muy densa
        let x = random(-2, 2);
        let y = random(-2, 2);
        puntos.push(new Punto(x, y));
    }
}

function calcularCentroide() {
    let xSum = 0;
    let ySum = 0;
    for (let punto of puntos) {
        xSum += punto.x;
        ySum += punto.y;
    }
    centroide = new Punto(xSum / puntos.length, ySum / puntos.length);
}

function analizarConvexidad() {
    const crossProduct = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

    // Ordenar los puntos por ángulo
    puntos.sort((a, b) => atan2(a.y - centroide.y, a.x - centroide.x) - atan2(b.y - centroide.y, b.x - centroide.x));

    let sign = 0;
    for (let i = 0; i < puntos.length; i++) {
        let cp = crossProduct(puntos[i], puntos[(i + 1) % puntos.length], puntos[(i + 2) % puntos.length]);
        if (cp !== 0) {
            if (sign === 0) {
                sign = cp > 0 ? 1 : -1;
            } else if ((cp > 0 && sign < 0) || (cp < 0 && sign > 0)) {
                document.getElementById("result").innerText = "CONCAVA";
                return;
            }
        }
    }
    document.getElementById("result").innerText = "CONVEXA";
}

// Manejo del botón para mostrar/ocultar el centroide
document.getElementById('toggleCentroid').onclick = () => {
    mostrarCentroid = !mostrarCentroid;
    redraw(); // Volver a dibujar
};
