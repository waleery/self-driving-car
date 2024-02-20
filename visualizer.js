class Visualizer {
    static drawNetwork(context, network) {
        const margin = 50;
        const left = margin;
        const top = margin;
        const width = context.canvas.width - margin * 2;
        const height = context.canvas.height - margin * 2;

        const levelHeight = height / network.levels.length;

        for (let i = network.levels.length - 1; i >= 0; i--) {
            const levelTop =
                top +
                lineralInterpolation(
                    height - levelHeight,
                    0,
                    network.levels.length == 1
                        ? 0.5
                        : i / (network.levels.length - 1)
                );
                context.setLineDash([7, 3]);

            Visualizer.drawLevel(
                context,
                network.levels[i],
                left,
                levelTop,
                width,
                levelHeight,
                i == network.levels.length-1 ? ['↑', '←', '→', '↓'] : []
            );
        }
    }

    static drawLevel(context, level, left, top, width, height, outputLabels) {
        const right = left + width;
        const bottom = top + height;

        const { inputs, outputs, weights, biases } = level;

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
                context.lineWidth = 2;

                context.strokeStyle = getRGBA(weights[i][j]);
                context.stroke();
            }
        }

        //'bottom' nodes
        for (let i = 0; i < inputs.length; i++) {
            const x = Visualizer.#getNodeX(inputs, i, left, right);
            context.beginPath();
            context.arc(x, bottom, nodeRadius * 0.7, 0, Math.PI * 2);
            context.fillStyle = getRGBA(inputs[i]);
            context.fill();
        }
        //'top' nodes
        for (let i = 0; i < outputs.length; i++) {
            const x = Visualizer.#getNodeX(outputs, i, left, right);

            //first draw black circle to avoid intersecion biases indicator and node connections
            context.beginPath();
            context.arc(x, top, nodeRadius, 0, Math.PI * 2);
            context.fillStyle = "black";
            context.fill();

            context.beginPath();
            context.arc(x, top, nodeRadius * 0.7, 0, Math.PI * 2);
            context.fillStyle = getRGBA(outputs[i]);
            context.fill();

            context.beginPath();
            context.lineWidth = 3;
            context.arc(x, top, nodeRadius, 0, Math.PI * 2);
            context.strokeStyle = getRGBA(biases[i]);
            context.setLineDash([3, 3]);
            context.stroke();
            context.setLineDash([]);

            //draw arrows in the last level
            if(outputLabels[i]){
                context.beginPath()
                context.textAlign="center",
                context.textBaseline = "middle",
                context.fillStyle = "black",
                context.strokeStyle = "white"
                context.font = (nodeRadius *1.3) + "px Arial"
                context.fillText(outputLabels[i], x, top)
                context.lineWidth = 0.5
                context.strokeText(outputLabels[i], x, top)

            }
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
