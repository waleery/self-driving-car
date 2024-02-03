class Controls {
    constructor() {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;

        this.#addKeyboardListeners();
    }
    // # is a private method
    #addKeyboardListeners() {
        // in arrow functions, 'this' refers to the object that defined the arrow function
        document.onkeydown = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
            }
            console.table(this);
        };

        // in normal functions, 'this' refers to the object that called the function
        document.onkeyup = function(event) {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
            }
            console.table(this);
        }.bind(this);

        //The bind method is used to change the context of (this) function. In this case, 
        //this inside the onkeyup function will point to the same object as this outside 
        //the function. Without using bind, this inside the onkeyup function would point 
        //to the document object, since document is the object that calls the function.
    }
}
