const canvas = document.getElementById("myCanvas")
canvas.width = 200;

const context = canvas.getContext("2d")

const car = new Car(100, 500, 30, 50)
car.draw(context)

animate()
function animate() {
    
    //if we change canvas height on each frame, we dont need to clear canvas
    canvas.height = window.innerHeight;
    //context.clearRect(0,0, canvas.width, window.innerHeight)
    
    car.update()
    car.draw(context)
    requestAnimationFrame(animate)
}