class Car {
    constructor(x, y, width, height, controlType, maxSpeed = 3) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.controls = new Controls(controlType);

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = maxSpeed;
        this.friction = 0.05;
        this.damaged = false

        this.useBrain = controlType == "AI"

        if(controlType !== "DUMMY"){
            this.sensor = new Sensor(this);
            this.brain = new NeuralNetwork(
                [this.sensor.rayCount, 6, 4]
            )
        }
        this.angle = 0;
    }

    update(roadBorders, traffic) {
        if(!this.damaged){
            this.#moveCar();
            this.polygon = this.#createPolygon()
            this.damaged = this.#assessDamage(roadBorders, traffic)
        }
        if(this.sensor){ 
            this.sensor.update(roadBorders, traffic);

            const offsets = this.sensor.readings.map(
                s=> s == null ? 0 : 1 - s.offset
            )

            const outputs = NeuralNetwork.feedForward(offsets, this.brain)


            //use neuralNetwork output to move the car
            if(this.useBrain){
              this.controls.forward = outputs[0]  
              this.controls.left = outputs[1]  
              this.controls.right = outputs[2]  
              this.controls.reverse = outputs[3]  
            }
        }
    }

    #assessDamage(roadBorders, traffic){
        for(let i = 0; i<roadBorders.length; i++){
            if(polysIntersect(this.polygon, roadBorders[i])){
                return true
            }
        }
        for(let i = 0; i<traffic.length; i++){
            if(polysIntersect(this.polygon, traffic[i].polygon)){
                return true
            }
        }
        return false
    }
    #createPolygon() {
        const points = [];

        //diagonal of a rectangle divided by 2
        const rad = Math.hypot(this.width, this.height) / 2;

        //angle knowing the width and the height
        const alpha = Math.atan2(this.width, this.height);
    
        //top right point
        points.push({
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.cos(this.angle - alpha) * rad,
        });
        points.push({
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.cos(this.angle + alpha) * rad,
        });
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
        });
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
        });
        return points
    }

    #moveCar() {
        this.#changeSpeed();

        //if car is moving
        if (this.speed !== 0) {
            //limit max speed
            this.#limitSpeed();

            //slow down by friction
            this.#includeFriction();

            const flip = this.speed > 0 ? 1 : -1;

            this.#changeAngle(flip);
        }

        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }

    #changeSpeed() {
        //if up arrow is pressed, increase speed
        if (this.controls.forward) {
            this.speed += this.acceleration;
        }

        //if down arrow is pressed, reduce speed
        if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }
    }

    #changeAngle(flip = 1) {
        if (this.controls.left) {
            this.angle += 0.03 * flip;
        }
        if (this.controls.right) {
            this.angle -= 0.03 * flip;
        }
    }

    #limitSpeed() {
        // speed can't be higher than maxSpeed
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }

        // speed in reverse is maxSpeed diveded by 2
        if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }
    }

    #includeFriction() {
        if (this.speed > 0) {
            this.speed -= this.friction;
        }

        if (this.speed < 0) {
            this.speed += this.friction;
        }
        //stop car if speed is less than friciton
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }
    }

    draw(context, color, drawSensor = false) {
        if(this.damaged){
            context.fillStyle="gray"
        } else {
            context.fillStyle = color
        }
        context.beginPath()
        context.moveTo(this.polygon[0].x, this.polygon[0].y)

        for(let i = 1; i<this.polygon.length;i++){
            context.lineTo(this.polygon[i].x, this.polygon[i].y)
        }
        context.fill()

        
        if(this.sensor && drawSensor){
            this.sensor.draw(context);
        }
    }
}
