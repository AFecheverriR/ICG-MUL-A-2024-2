class Punto {
    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    #x;
    #y;

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }
}

class Figura {
    constructor(svgCanvas) {
        this.#svgCanvas = svgCanvas;
    }

    #svgCanvas;

    // Método para agregar un elemento SVG al canvas
    agregarElemento(elemento) {
        this.#svgCanvas.appendChild(elemento);
    }

    // Método vacío a sobrescribir en las subclases para dibujar
    dibujar() {
        throw new Error('Este método debe ser implementado por las subclases');
    }
}

class Linea extends Figura {
    constructor(svgCanvas, puntoInicio, puntoFin) {
        super(svgCanvas);
        this.#puntoInicio = puntoInicio;
        this.#puntoFin = puntoFin;
    }

    #puntoInicio;
    #puntoFin;

    dibujar() {
        const puntos = this.bresenham(this.#puntoInicio, this.#puntoFin);
        puntos.forEach(p => {
            const punto = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            punto.setAttribute("cx", p.x);
            punto.setAttribute("cy", p.y);
            punto.setAttribute("r", 1);
            punto.setAttribute("fill", "black");
            this.agregarElemento(punto);
        });
    }

    bresenham(p1, p2) {
        const puntos = [];
        let x1 = p1.x;
        let y1 = p1.y;
        let x2 = p2.x;
        let y2 = p2.y;

        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        const sx = (x1 < x2) ? 1 : -1;
        const sy = (y1 < y2) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            puntos.push(new Punto(x1, y1));
            if (x1 === x2 && y1 === y2) break;
            const err2 = err * 2;
            if (err2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (err2 < dx) {
                err += dx;
                y1 += sy;
            }
        }
        return puntos;
    }
}

class Circunferencia extends Figura {
    constructor(svgCanvas, centro, r) {
        super(svgCanvas);
        this.#centro = centro;
        this.#r = r;
    }

    #centro;
    #r;

    dibujar() {
        const circunferencia = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circunferencia.setAttribute("cx", this.#centro.x);
        circunferencia.setAttribute("cy", this.#centro.y);
        circunferencia.setAttribute("r", this.#r);
        circunferencia.setAttribute("stroke", "black");
        circunferencia.setAttribute("fill", "none");
        this.agregarElemento(circunferencia);
    }
}

class Elipse extends Figura {
    constructor(svgCanvas, centro, rx, ry) {
        super(svgCanvas);
        this.#centro = centro;
        this.#rx = rx;
        this.#ry = ry;
    }

    #centro;
    #rx;
    #ry;

    dibujar() {
        const elipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        elipse.setAttribute("cx", this.#centro.x);
        elipse.setAttribute("cy", this.#centro.y);
        elipse.setAttribute("rx", this.#rx);
        elipse.setAttribute("ry", this.#ry);
        elipse.setAttribute("stroke", "black");
        elipse.setAttribute("fill", "none");
        this.agregarElemento(elipse);
    }
}

const svgCanvas = document.getElementById('svgCanvas');

// Instanciar y dibujar las figuras
const puntoInicio = new Punto(50, 50);
const puntoFin = new Punto(200, 200);
const linea = new Linea(svgCanvas, puntoInicio, puntoFin);
linea.dibujar();

const centroCircunferencia = new Punto(300, 100);
const circunferencia = new Circunferencia(svgCanvas, centroCircunferencia, 50);
circunferencia.dibujar();

const centroElipse = new Punto(400, 300);
const elipse = new Elipse(svgCanvas, centroElipse, 80, 50);
elipse.dibujar();
