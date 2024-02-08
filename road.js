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
    }

    getLaneCenter(laneIndex) {
        const laneWidth = this.width / this.laneCount;

        //    start road + (               which lane                      ) + ( to center on lane)
        return this.left + Math.min(laneIndex, this.laneCount-1) * laneWidth + laneWidth/2;
    }

    draw(context) {
        context.lineWidth = 5;
        context.strokeStyle = "white";

        //drawing lines on the road
        for (let i = 0; i <= this.laneCount; i++) {
            const x = lineralInterpolation(
                this.left,
                this.right,
                i / this.laneCount
            );

            if (i > 0 && i < this.laneCount) {
                context.setLineDash([30, 25]);
            } else {
                context.setLineDash([]);
            }

            context.beginPath();
            context.moveTo(x, this.top);
            context.lineTo(x, this.bottom);
            context.stroke();
        }
    }
}
