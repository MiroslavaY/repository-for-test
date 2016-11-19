(function () {

    'use strict';

    let canvas = document.getElementById('canvas'),
        start = document.getElementById('start'),
        stop = document.getElementById('stop'),
        score = document.getElementById('score'),
        ctx = canvas.getContext('2d'),
        mouseX = 0,
        mouseY = 0,
        squares = [],
        running;


    class Square {

        constructor() {
            this.x = getRandomNumber(0, canvas.width);
            this.y = 0;
            this.color = getRandomColor();
            this.speed = getRandomNumber(1, 8);
            this.size = 20;
            this.mouse = false;
        }

        move() {
            (this.y >= canvas.clientHeight) ?
                this.y = 0 :
                this.y += this.speed;
        }
    }

    let animate = () => {

        squares.push(new Square());
        squares.forEach(function (el) {
            el.move();
        });
        redrawCanvas();
        running = requestAnimationFrame(animate);
    };


    let getRandomColor = () => {
        return `rgb(${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)})`;
    };

    let getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    };


    let updateCanvas = (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;
        redrawCanvas();
    };

    let catchSquare = () => {

        squares.forEach(function (el, i, arr) {
            if (arr[i].mouse == true) {
                squares.splice(i, 1);
                updateCounter(false);
            }
        });
        redrawCanvas();
    };

    let redrawCanvas = () => {

        clearCanvas();
        squares.forEach(function (el, i, arr) {
            ctx.beginPath();
            ctx.fillStyle = arr[i].color;
            ctx.rect(arr[i].x, arr[i].y, arr[i].size, arr[i].size);
            (ctx.isPointInPath(mouseX, mouseY)) ?
                arr[i].mouse = true :
                arr[i].mouse = false;
            ctx.fill();
        });
    };

    let updateCounter = (clear) => {

        (clear) ?
            score.innerHTML = 0 :
            score.innerHTML = parseInt(score.innerHTML) + 1;
    };

    let clearCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    let stopAnimation = () => {

        cancelAnimationFrame(running);
        clearCanvas();
        squares = [];
    };

    let startAnimation = () => {

        updateCounter(true);
        animate();
        canvas.addEventListener('mousemove', updateCanvas, false);
        canvas.addEventListener('click', catchSquare, false);
    };

    start.addEventListener('click', startAnimation);

    stop.addEventListener('click', stopAnimation);

})();
