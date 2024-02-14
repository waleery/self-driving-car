class Level {
    constructor(inputCount, outputCount){
        this.inputs = new Array(inputCount)
        this.outputs = new Array(outputCount)
        //each output neuron has a bias (value) which it will fire action 
        this.biases = new Array(outputCount)

        this.weights = []
        for(let i = 0; i<inputCount; i++){
            //weights for each connection from input to output
            this.weights[i] = new Array(outputCount)
        }

    }
}