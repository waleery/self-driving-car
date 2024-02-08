const canvas = document.getElementById("myCanvas")
canvas.width = 200;

const context = canvas.getContext("2d")

const road = new Road(canvas.width/2, canvas.width*0.95)
const car = new Car(road.getLaneCenter(3), 500, 30, 50)


animate()
function animate() {
    
    //if we change canvas height on each frame, we dont need to clear canvas
    canvas.height = window.innerHeight;
    //context.clearRect(0,0, canvas.width, window.innerHeight)
    
    car.update()
    road.draw(context)
    car.draw(context)
    requestAnimationFrame(animate)
}