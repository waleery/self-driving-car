const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

const carContext = carCanvas.getContext("2d");
const networkContext = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

//const cars = [new Car(road.getLaneCenter(1), 500, 30, 50, "KEYS")];

const N = 100
const cars = generateCars(N)

const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY",2)
]

animate();

function generateCars(N){
    const cars = []
    for(let i = 0; i<= N; i++){
        cars.push(new Car(road.getLaneCenter(1), 500, 30, 50, "AI"))
    }
    return cars
}

function animate(time) {
    //if we change carCanvas height on each frame, we dont need to clear carCanvas
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;
    //carContext.clearRect(0,0, carCanvas.width, window.innerHeight)

    //update traffic cars positions
    for(let i = 0; i<traffic.length; i++){
        traffic[i].update(road.borders,[])
    }

    //update AI cars positions
    for(i = 0; i< cars.length; i++){
        cars[i].update(road.borders, traffic)
    }

    //save carContext, because on each frame translate would be added
    carContext.save();

    //to make illusion that camera is above the car
    carContext.translate(0, -cars[0].y + carCanvas.height *0.75);
    
    //draw road
    road.draw(carContext);

    //draw traffic cars
    for(let i = 0;i<traffic.length;i++){
        traffic[i].draw(carContext, "red")
    }

    //change cars opacity
    carContext.globalAlpha = 0.2
    //draw AI cars
    for(let i = 0;i<cars.length;i++){
        cars[i].draw(carContext, "blue")
    }
    //restore cars opacity
    carContext.globalAlpha = 1

    //draw
    cars[0].draw(carContext, "blue", true)


    
    //restore carContext to state before translate
    carContext.restore();

    //animate line between nodes
    networkContext.lineDashOffset= -time/50 // '-' to change direction of movement
    Visualizer.drawNetwork(networkContext, cars[0].brain)
    requestAnimationFrame(animate);
}
