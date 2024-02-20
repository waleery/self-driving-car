const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

const carContext = carCanvas.getContext("2d");
const networkContext = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 500, 30, 50, "KEYS");
const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY",2)
]

animate();
function animate(time) {
    //if we change carCanvas height on each frame, we dont need to clear carCanvas
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;
    //carContext.clearRect(0,0, carCanvas.width, window.innerHeight)

    for(let i = 0; i<traffic.length; i++){
        traffic[i].update(road.borders,[])
    }

    car.update(road.borders, traffic);

    //save carContext, because on each frame translate would be added
    carContext.save();

    //to make illusion that camera is above the car
    carContext.translate(0, -car.y + carCanvas.height *0.75);
    
    road.draw(carContext);
    for(let i = 0;i<traffic.length;i++){
        traffic[i].draw(carContext, "red")
    }
    car.draw(carContext, "blue");
    
    //restore carContext to state before translate
    carContext.restore();

    //animate line between nodes
    networkContext.lineDashOffset= -time/50 // '-' to change direction of movement
    Visualizer.drawNetwork(networkContext, car.brain)
    requestAnimationFrame(animate);
}
