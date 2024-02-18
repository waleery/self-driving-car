const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

const context = carCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 500, 30, 50, "AI");
const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY",2)
]

animate();
function animate() {
    //if we change carCanvas height on each frame, we dont need to clear carCanvas
    carCanvas.height = window.innerHeight;
    //context.clearRect(0,0, carCanvas.width, window.innerHeight)

    for(let i = 0; i<traffic.length; i++){
        traffic[i].update(road.borders,[])
    }

    car.update(road.borders, traffic);

    //save context, because on each frame translate would be added
    context.save();

    //to make illusion that camera is above the car
    context.translate(0, -car.y + carCanvas.height *0.75);
    
    road.draw(context);
    for(let i = 0;i<traffic.length;i++){
        traffic[i].draw(context, "red")
    }
    car.draw(context, "blue");
    
    //restore context to state before translate
    context.restore();
   
   
    requestAnimationFrame(animate);
}
