class Sensor {
    constructor(car) {
        this.car = car;
        this.rayCount = 3;
        this.rayLength = 100;
        this.raySpread = Math.PI / 4; //45

        this.rays = [];
    }
    update() {
        this.#castRays();
    }
    
    #castRays() {
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle =
                lineralInterpolation(
                    this.raySpread / 2, // 22.5
                    -this.raySpread / 2, //-22.5
                    this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)
                ) + this.car.angle;

            const start = { x: this.car.x, y: this.car.y };
            const end = {
                x: this.car.x - Math.sin(rayAngle) * this.rayLength,
                y: this.car.y - Math.cos(rayAngle) * this.rayLength,
            };
            this.rays.push([start, end]);
        }
    }
    draw(context) {
        for (let i = 0; i < this.rayCount; i++) {
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "yellow";
            context.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            context.lineTo(this.rays[i][1].x, this.rays[i][1].y);
            context.stroke();
        }
        //DOT
        context.beginPath();

        // Draws a circle centered at (x, y) with radius 4
        context.arc(this.rays[0][0].x, this.rays[0][0].y, 4, 0, 2 * Math.PI);

        context.fillStyle = "green";
        context.fill();
    }
}
