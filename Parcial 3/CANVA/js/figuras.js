
 export class Figura {

    constructor(
        posicionesCursor,
        color_linea,
        color_relleno,
        grosor_linea,
        rellenoActivo = true
    ) {

        this.posicionesCursor = posicionesCursor;

        this.color_linea = color_linea;

        this.color_relleno = color_relleno;

        this.grosor_linea = grosor_linea;

        this.rellenoActivo = rellenoActivo;
    }
}

// CUADRADO
// =========================

export class Cuadrado extends Figura {

    constructor(
        posicionesCursor,
        color_linea,
        color_relleno,
        grosor_linea,
        rellenoActivo
    ) {

        super(
            posicionesCursor,
            color_linea,
            color_relleno,
            grosor_linea,
            rellenoActivo
        );

        this.x = Math.min(
            posicionesCursor.iniciales.x,
            posicionesCursor.finales.x
        );

        this.y = Math.min(
            posicionesCursor.iniciales.y,
            posicionesCursor.finales.y
        );

        this.ancho = Math.abs(
            posicionesCursor.finales.x -
            posicionesCursor.iniciales.x
        );

        this.alto = Math.abs(
            posicionesCursor.finales.y -
            posicionesCursor.iniciales.y
        );
    }

    Dibujar(ctx) {

        ctx.beginPath();

        ctx.strokeStyle = this.color_linea;

        ctx.lineWidth = this.grosor_linea;

        ctx.fillStyle = this.color_relleno;

        if (this.rellenoActivo) {

            ctx.fillRect(
                this.x,
                this.y,
                this.ancho,
                this.alto
            );
        }

        ctx.strokeRect(
            this.x,
            this.y,
            this.ancho,
            this.alto
        );
    }
}


// LINEA
// =========================

export class Linea {

    constructor(
        posicionesCursor,
        color_linea,
        grosor_linea
    ) {

        this.posicionesCursor = posicionesCursor;

        this.color_linea = color_linea;

        this.grosor_linea = grosor_linea;
    }

    Dibujar(ctx) {

        ctx.beginPath();

        ctx.lineCap = "round";

        ctx.strokeStyle = this.color_linea;

        ctx.lineWidth = this.grosor_linea;

        ctx.moveTo(
            this.posicionesCursor.iniciales.x,
            this.posicionesCursor.iniciales.y
        );

        ctx.lineTo(
            this.posicionesCursor.finales.x,
            this.posicionesCursor.finales.y
        );

        ctx.stroke();
    }
}


// CIRCULO
// =========================

   export class Circulo extends Figura {

    constructor(
        posicionesCursor,
        color_linea,
        color_relleno,
        grosor_linea,
        rellenoActivo
    ) {

        super(
            posicionesCursor,
            color_linea,
            color_relleno,
            grosor_linea,
            rellenoActivo
        );

        this.radioX = Math.abs(
            posicionesCursor.finales.x -
            posicionesCursor.iniciales.x
        ) / 2;

        this.radioY = Math.abs(
            posicionesCursor.finales.y -
            posicionesCursor.iniciales.y
        ) / 2;

        this.centroX =
            (posicionesCursor.iniciales.x +
            posicionesCursor.finales.x) / 2;

        this.centroY =
            (posicionesCursor.iniciales.y +
            posicionesCursor.finales.y) / 2;
    }

    Dibujar(ctx) {

        ctx.beginPath();

        ctx.strokeStyle = this.color_linea;

        ctx.fillStyle = this.color_relleno;

        ctx.lineWidth = this.grosor_linea;

        ctx.ellipse(
            this.centroX,
            this.centroY,
            this.radioX,
            this.radioY,
            0,
            0,
            Math.PI * 2
        );

        if (this.rellenoActivo) {
            ctx.fill();
        }

        ctx.stroke();
    }
}


// ESTRELLA
// =========================

export class Estrella extends Figura {

    constructor(
        posicionesCursor,
        color_linea,
        color_relleno,
        grosor_linea,
        rellenoActivo
    ) {

        super(
            posicionesCursor,
            color_linea,
            color_relleno,
            grosor_linea,
            rellenoActivo
        );

        this.radio = Math.abs(
            posicionesCursor.finales.x -
            posicionesCursor.iniciales.x
        );
    }

    Dibujar(ctx) {

        let cx = this.posicionesCursor.iniciales.x;
        let cy = this.posicionesCursor.iniciales.y;

        let spikes = 5;

        let outerRadius = this.radio;

        let innerRadius = this.radio / 2;

        let rot = Math.PI / 2 * 3;

        let step = Math.PI / spikes;

        ctx.beginPath();

        ctx.moveTo(cx, cy - outerRadius);

        for (let i = 0; i < spikes; i++) {

            let x = cx + Math.cos(rot) * outerRadius;
            let y = cy + Math.sin(rot) * outerRadius;

            ctx.lineTo(x, y);

            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;

            ctx.lineTo(x, y);

            rot += step;
        }

        ctx.closePath();

        ctx.strokeStyle = this.color_linea;

        ctx.fillStyle = this.color_relleno;

        ctx.lineWidth = this.grosor_linea;

        if (this.rellenoActivo) {
            ctx.fill();
        }

        ctx.stroke();
    }
}


// STICKER
// =========================

export class Sticker {

    constructor(posicionesCursor, urlImagen) {

        this.posicionesCursor = posicionesCursor;

        this.imagen = new Image();

        this.imagen.src = urlImagen;
    }

    Dibujar(ctx) {

        if (!this.imagen.complete) return;

        ctx.drawImage(
            this.imagen,
            this.posicionesCursor.iniciales.x,
            this.posicionesCursor.iniciales.y,
            this.imagen.width / 2,
            this.imagen.height / 2
        );
    }
}