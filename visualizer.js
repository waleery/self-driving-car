class Visualizer {
    static drawNetwork(context, network) {
        const margin = 50;
        const left = margin;
        const top = margin;
        const width = context.canvas.width - margin * 2;
        const height = context.canvas.height - margin * 2;

        Visualizer.drawLevel(
            context,
            network.levels[0],
            left,
            top,
            width,
            height
        );
    }

    static drawLevel(context, level, left, top, width, height) {
        const right = left + width;
        const bottom = top + height;

        const { inputs, outputs, weights } = level;

        const nodeRadius = 20;

        //draw connection first -> nodes are above conenctions
        //connections between nodes
        for (let i = 0; i < inputs.length; i++) {
            for (let j = 0; j < outputs.length; j++) {
                context.beginPath();
                context.moveTo(
                    Visualizer.#getNodeX(inputs, i, left, right),
                    bottom
                );
                context.lineTo(
                    Visualizer.#getNodeX(outputs, j, left, right),
                    top
                );
                context.lineWidth = 3;

                const value = weights[i][j];

                // -1 <= value <= 1
                //if closer to 0, then more transparency
                const alpha = Math.abs(value);

                //yellow for positive values 
                //-> to make yellow, we need red and green
                const R = value < 0 ? 0 : 255;
                const G = R;
                
                //blue for negative values
                const B = value > 0 ? 0 : 255;

                context.strokeStyle =
                    "rgba(" + R + "," + G + "," + B + "," + alpha + ")";
                context.stroke();
            }
        }

        //'bottom' nodes
        for (let i = 0; i < inputs.length; i++) {
            const x = Visualizer.#getNodeX(inputs, i, left, right);
            context.beginPath();
            context.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
            context.fillStyle = "white";
            context.fill();
        }
        //'top' nodes
        for (let i = 0; i < outputs.length; i++) {
            const x = Visualizer.#getNodeX(outputs, i, left, right);
            context.beginPath();
            context.arc(x, top, nodeRadius, 0, Math.PI * 2);
            context.fillStyle = "white";
            context.fill();
        }
    }
    //helper method
    static #getNodeX(nodes, index, left, right) {
        return lineralInterpolation(
            left,
            right,
            nodes.length == 1 ? 0.5 : index / (nodes.length - 1)
        );
    }
}
