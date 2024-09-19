class Figura {
    constructor(svgCanvas) {
        this.svgCanvas = svgCanvas;
    }

    // Método para agregar un elemento SVG al canvas
    agregarElemento(elemento) {
        this.svgCanvas.appendChild(elemento);
    }

    // Método vacío a sobrescribir en las subclases para dibujar
    dibujar() {
        throw new Error('Este método debe ser implementado por las subclases');
    }
}

class Linea extends Figura {
    constructor(svgCanvas, x1, y1, x2, y2) {
        super(svgCanvas);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    dibujar() {
        const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");
        linea.setAttribute("x1", this.x1);
        linea.setAttribute("y1", this.y1);
        linea.setAttribute("x2", this.x2);
        linea.setAttribute("y2", this.y2);
        linea.setAttribute("stroke", "black");
        this.agregarElemento(linea);
    }
}

class Circunferencia extends Figura {
    constructor(svgCanvas, cx, cy, r) {
        super(svgCanvas);
        this.cx = cx;
        this.cy = cy;
        this.r = r;
    }

    dibujar() {
        const circunferencia = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circunferencia.setAttribute("cx", this.cx);
        circunferencia.setAttribute("cy", this.cy);
        circunferencia.setAttribute("r", this.r);
        circunferencia.setAttribute("stroke", "black");
        circunferencia.setAttribute("fill", "none");
        this.agregarElemento(circunferencia);
    }
}

class Elipse extends Figura {
    constructor(svgCanvas, cx, cy, rx, ry) {
        super(svgCanvas);
        this.cx = cx;
        this.cy = cy;
        this.rx = rx;
        this.ry = ry;
    }

    dibujar() {
        const elipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        elipse.setAttribute("cx", this.cx);
        elipse.setAttribute("cy", this.cy);
        elipse.setAttribute("rx", this.rx);
        elipse.setAttribute("ry", this.ry);
        elipse.setAttribute("stroke", "black");
        elipse.setAttribute("fill", "none");
        this.agregarElemento(elipse);
    }
}

// Seleccionar el SVG canvas
const svgCanvas = document.getElementById('svgCanvas');

// Instanciar y dibujar las figuras
const linea = new Linea(svgCanvas, 50, 50, 200, 200);
linea.dibujar();

const circunferencia = new Circunferencia(svgCanvas, 300, 100, 50);
circunferencia.dibujar();

const elipse = new Elipse(svgCanvas, 400, 300, 80, 50);
elipse.dibujar();
