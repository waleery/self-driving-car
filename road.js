class Road {
    constructor(x, width, laneCount = 3) {
        //center of the road
        this.x = x;

        this.width = width;
        this.laneCount = laneCount;
    
        //where road start and end
        this.left = x - width / 2;
        this.right = x + width / 2;

        //if we draw with js infinity, werid thing happens
        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;

        const topLeft = { x: this.left, y: this.top };
        const topRight = { x: this.right, y: this.top };
        const bottomLeft = { x: this.left, y: this.bottom };
        const bottomRight = { x: this.right, y: this.bottom };
        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight],
        ];
    }

    getLaneCenter(laneIndex) {
        const laneWidth = this.width / this.laneCount;

        return (
            this.left +                                           // start road
            Math.min(laneIndex, this.laneCount - 1) * laneWidth + // which lane
            laneWidth / 2                                         // to center on lane
        );
    }

    draw(context) {
        context.lineWidth = 5;
        context.strokeStyle = "white";

        //drawing lines on the road
        //starting at 1 and "<" not "<=" because borders are drawing separately
        for (let i = 1; i < this.laneCount; i++) {
            const x = lineralInterpolation(
                this.left,
                this.right,
                i / this.laneCount
            );

            context.setLineDash([30, 25]);
            context.beginPath();
            context.moveTo(x, this.top);
            context.lineTo(x, this.bottom);
            context.stroke();
        }

        //drawing borders
        context.setLineDash([])
        this.borders.forEach(border=>{
            context.beginPath();
            context.moveTo(border[0].x, border[0].y)
            context.lineTo(border[1].x, border[1].y)
            context.stroke()
        })
    }
}
