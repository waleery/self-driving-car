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

        const { inputs, outputs } = level;

        const nodeRadius = 20;
        for (let i = 0; i < inputs.length; i++) {
            const x = lineralInterpolation(
                left,
                right,
                inputs.length == 1 ? 0.5 : i / (inputs.length - 1)
            );
            context.beginPath();
            context.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
            context.fillStyle = "white";
            context.fill();
        }

        for (let i = 0; i < outputs.length; i++) {
            const x = lineralInterpolation(
                left,
                right,
                outputs.length == 1 ? 0.5 : i / (outputs.length - 1)
            );
            context.beginPath();
            context.arc(x, top, nodeRadius, 0, Math.PI * 2);
            context.fillStyle = "white";
            context.fill();
        }
    }
}
