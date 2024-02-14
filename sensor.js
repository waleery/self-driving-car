class Sensor {
    constructor(car) {
        this.car = car;
        this.rayCount = 5;
        this.rayLength = 150;
        this.raySpread = Math.PI / 2; //45

        this.rays = [];
        this.readings=[]
    }
    update(roadBorders, traffic) {
        this.#castRays();
        this.readings=[]
        this.rays.forEach(ray => {
            this.readings.push(
                this.#getReading(ray, roadBorders, traffic)
            )
        });
    }

    #getReading(ray, roadBorders){
        let touches = []
        for(let i = 0; i<roadBorders.length; i++){
            const touch = getIntersection(
                ray[0], ray[1], roadBorders[i][0], roadBorders[i][1]
            )
            if(touch){
                touches.push(touch)
            }
        }
        for(let i = 0; i<traffic.length; i++){
            const polly = traffic[i].polygon
            for(let j = 0; j<polly.length; j++){
                const value = getIntersection(ray[0], ray[1], polly[j], polly[(j+1)%polly.length])
            
                if(value){
                    touches.push(value)
                }
            }
        }

        if(touches.length == 0){
            return null
        } else {
            const offsets = touches.map(e => e.offset)
            const minOffset = Math.min(...offsets)
            return touches.find(e => e.offset == minOffset)
        }
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
            let end = this.rays[i][1]
            if(this.readings[i]){
                end = this.readings[i]
            }

            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "yellow";
            context.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            context.lineTo(end.x, end.y);
            context.stroke();

            //ray behind 'object'
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "black";
            context.moveTo(this.rays[i][1].x, this.rays[i][1].y);
            context.lineTo(end.x, end.y);
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
