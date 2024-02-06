class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.controls = new Controls();

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;

        this.angle = 0;
    }

    update() {
        this.#changeSpeed();


        //if car is moving
        if (this.speed !== 0) {
            //limit max speed
            this.#limitSpeed();

            //slow down by friction
            this.#includeFriction();
            
            const flip = this.speed > 0 ? 1 : -1

            this.#changeAngle(flip);

        }

        this.#moveCar();
    }

    #moveCar() {
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
        //stop car if speed is less than friciton
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        if (this.speed > 0) {
            this.speed -= this.friction;
        }

        if (this.speed < 0) {
            this.speed += this.friction;
        }
    }

    draw(context) {

        //center car
        context.translate(this.x, this.y);

        //rotate car
        context.rotate(-this.angle);

        context.beginPath();

        //CAR

        // The rectangle is centered at (x, y) and has the size (width, height)
        context.rect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
        context.fill();


        //DOT
        context.beginPath();

        // Draws a circle centered at (x, y) with radius 3
        context.arc(0,0, 3, 0, 2 * Math.PI);
        
        context.fillStyle = "green";
        context.fill();

    }
}
