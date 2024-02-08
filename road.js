class Road {
    constructor(x, width, laneCount = 3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - width / 2;
        this.right = x + width / 2;

        //if we draw with js infinity, werid thing happens
        const infinity = 1000000
        this.top = -infinity
        this.bottom = infinity
    }

    draw(context){
        context.lineWidth = 5
        context.strokeStyle = "white"

        //line on the left side
        context.beginPath()
        context.moveTo(this.left, this.top)
        context.lineTo(this.left, this.bottom)
        context.stroke()

        //line on the right side
        context.beginPath()
        context.moveTo(this.right, this.top)
        context.lineTo(this.right, this.bottom)
        context.stroke()
    }
}
