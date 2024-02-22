class NeuralNetwork {
    constructor(neuronCounts) {
        this.levels = [];
        for (let i = 0; i < neuronCounts.length - 1; i++) {
            this.levels.push(
                new Level(
                    neuronCounts[i], //Level input count
                    neuronCounts[i + 1] //Level output count
                )
            );
        }
    }

    static feedForward(givenInputs, network) {
        //we need to generate output form first layer
        let outputs = Level.feedForward(givenInputs, network.levels[0]);

        //next layers outputs are generated with output from previous layers
        for (let i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(outputs, network.levels[i]);
        }
        return outputs;
    }
}

class Level {
    constructor(inputCount, outputCount) {
        //values get from the car sensors
        this.inputs = new Array(inputCount);

        this.outputs = new Array(outputCount);

        //each output neuron has a bias (value) which it will fire action
        this.biases = new Array(outputCount);

        this.sums = new Array(outputCount);
        this.weights = [];
        for (let i = 0; i < inputCount; i++) {
            //weights for each connection from input to output
            this.weights[i] = new Array(outputCount);
        }
        Level.#randomize(this);
    }

    static #randomize(level) {
        for (let i = 0; i < level.inputs.length; i++) {
            for (let j = 0; j < level.outputs.length; j++) {
                //random number between -1 and 1
                //negative values means to dont do something
                level.weights[i][j] = Math.random() * 2 - 1;
            }
        }

        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i] = Math.random() * 2 - 1;
        }
    }

    static feedForward(givenInputs, level) {
        for (let i = 0; i < level.inputs.length; i++) {
            //values get form the sensor
            level.inputs[i] = givenInputs[i];
        }

        for (let i = 0; i < level.outputs.length; i++) {
            let sum = 0;
            for (let j = 0; j < level.inputs.length; j++) {
                sum += level.inputs[j] * level.weights[j][i];
            }
            level.sums[i] = sum;
            if (sum > level.biases[i]) {
                level.outputs[i] = 1;
            } else {
                level.outputs[i] = 0;
            }
        }
        return level.outputs;
    }
}
