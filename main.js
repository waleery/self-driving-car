const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

const carContext = carCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 500, 30, 50, "AI");
const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY",2)
]

animate();
function animate() {
    //if we change carCanvas height on each frame, we dont need to clear carCanvas
    carCanvas.height = window.innerHeight;
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
   
   
    requestAnimationFrame(animate);
}
