class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(context) {
        context.beginPath();

        // The rectangle is centered at (x, y) and has the size (width, height)
        context.rect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );
        context.fill();


        context.beginPath();

        // Draws a circle centered at (x, y) with radius 3
        context.arc(this.x, this.y, 3, 0, 2 * Math.PI);
        
        context.fillStyle = "green";
        context.fill();

        //reset the fill color to black
        context.fillStyle = "black";
    }
}
