//get canvases
const carCanvas = document.getElementById("carCanvas");
const networkCanvas = document.getElementById("networkCanvas");

//set canvases width
carCanvas.width = 200;
networkCanvas.width = 300;

//get drawing contexts
const carContext = carCanvas.getContext("2d");
const networkContext = networkCanvas.getContext("2d");

const numberOfAICars = 100;
const numberOfTrafficCars = 100;


// default 'game' type  AI/KEYS
let carType = "AI"

//default mutate value
let mutateValue = 20

//make road instance
let road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

//initialization of car variables
let bestCar;
let cars = generateCars(numberOfAICars);
let traffic = generateTraffic(numberOfTrafficCars);


//get element displaying id of saved brain
const savedBrainValue = document.getElementById("savedBrainValue");

//get range input to change AI mutation
const mutateRangeInput = document.getElementById("mutateRange");

//get label to display mutate value
const mutateRangeLabel = document.getElementById("rangeValue");

//get input to change game type
const checkboxGameType = document.getElementById("AIcars");

checkboxGameType.checked = carType == "AI" ? true : false

getBestBrainFromLocalStorage();

drawCurrentBrainId();

hideBrainInfo()

animate();

function generateTraffic(n) {
    const traffic = [];
    for (let i = 0; i < n; i++) {
        const lane = Math.floor(Math.random() * 3); // Losuj pas drogowy
        const position = -100 * i; // Ustaw pozycję startową (dodawanie przed odejmowaniem)
        traffic.push(
            new Car(
                road.getLaneCenter(lane),
                position,
                30,
                50,
                "DUMMY",
                2,
                getRandomColor()
            )
        );
    }
    return traffic;
}

function generateCars(N) {
    const cars = [];
    if (carType === "AI") {
        for (let i = 0; i <= N; i++) {
            cars.push(new Car(road.getLaneCenter(1), 500, 30, 50, "AI"));
        }
    } else {
        cars.push(new Car(road.getLaneCenter(1), 500, 30, 50, "KEYS"));
    }

    bestCar = cars[0];
    return cars;
}

function resetRun() {
    cars = generateCars(numberOfAICars);
    traffic = generateTraffic(numberOfTrafficCars);
    getBestBrainFromLocalStorage();
    drawCurrentBrainId();
}

function save() {
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
    savedBrainValue.textContent = bestCar.brain.id;
}

function discard() {
    localStorage.removeItem("bestBrain");
    savedBrainValue.textContent = "--------";
}

function drawCurrentBrainId() {
    const spanElement = document.getElementById("currentBrainValue");
    spanElement.textContent = bestCar.brain.id;
}

function findBestCar() {
    bestCar = cars.find(
        (car) =>
            car.y ===
            Math.min(
                ...cars.map((car) => car.y) //creating array with only y values and spreading this array
            )
    );
}

function animate(time) {
    //if we change carCanvas height on each frame, we dont need to clear carCanvas
    //carContext.clearRect(0,0, carCanvas.width, window.innerHeight)

    //update canvases height
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    //update traffic cars positions
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }

    //update AI cars positions
    for (i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic);
    }

    findBestCar();

    //save carContext, because on each frame translate would be added
    carContext.save();

    //to make illusion that camera is above the car
    carContext.translate(0, -bestCar.y + carCanvas.height * 0.75);

    //draw road
    road.draw(carContext);

    //draw traffic cars
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carContext, "red");
    }

    //change cars opacity
    carContext.globalAlpha = 0.2;

    //draw AI cars
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carContext);
    }

    //restore cars opacity
    carContext.globalAlpha = 1;

    //draw best car whith full opacity
    bestCar.draw(carContext, true);

    //restore carContext to state before translate
    carContext.restore();

    //animate line between nodes
    networkContext.lineDashOffset = -time / 50; // '-' to change direction of movement
    Visualizer.drawNetwork(networkContext, bestCar.brain);

    requestAnimationFrame(animate);
}

function getBestBrainFromLocalStorage() {
    if (localStorage.getItem("bestBrain")) {
        for (let i = 0; i < cars.length; i++) {
            const bestBrain = JSON.parse(localStorage.getItem("bestBrain"));
            cars[i].brain = bestBrain;

            savedBrainValue.textContent = bestBrain.id;

            //mutate every car except best one
            if (i != 0) {
                NeuralNetwork.mutate(cars[i].brain, mutateValue/100); //we want percents in mutate value
            }
        }
    } else {
        savedBrainValue.textContent = "--------";
    }
}
//event listener to change 'game' type
checkboxGameType.addEventListener("change", (event) => {
    const isChecked = event.target.checked;
    carType = isChecked ? "AI" : "KEYS"
    hideBrainInfo()
    resetRun()

    //lost focus
    checkboxGameType.blur()

});

function hideBrainInfo(){
        let displayBrainInfo = checkboxGameType.checked ? "block" : 'none'
    
        const barinInfoSection = document.getElementsByClassName('brainInfo')
        console.log(barinInfoSection)

        Array.from(barinInfoSection).forEach(element => {
            console.log(element)
            element.style.display = displayBrainInfo
            
        });
    
}



//set input range to default value
mutateRangeInput.value = mutateValue

//update label which display mutate value
mutateRangeLabel.textContent = mutateRangeInput.value +"%"

//event listener which ONLY update label with mutate value (change is alvays visible)
mutateRangeInput.addEventListener("input", function(event) {
    mutateRangeLabel.textContent = mutateRangeInput.value +"%";
});

//event listener which update mutateValue (change is fired after mouseup)
mutateRangeInput.addEventListener("mouseup", function(event) {
    mutateValue = event.target.value
    resetRun()
});

