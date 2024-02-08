const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const context = canvas.getContext("2d");

const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 500, 30, 50);

animate();
function animate() {
    //if we change canvas height on each frame, we dont need to clear canvas
    canvas.height = window.innerHeight;
    //context.clearRect(0,0, canvas.width, window.innerHeight)

    car.update();

    //save context, because on each frame translate would be added
    context.save();

    //to make illusion that camera is above the car
    context.translate(0, -car.y + canvas.height *0.75);
    
    road.draw(context);
    car.draw(context);
    
    //restore context to state before translate
    context.restore();
   
   
    requestAnimationFrame(animate);
}
