'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {

    'use strict';

    var canvas = document.getElementById('canvas'),
        start = document.getElementById('start'),
        stop = document.getElementById('stop'),
        score = document.getElementById('score'),
        ctx = canvas.getContext('2d'),
        mouseX = 0,
        mouseY = 0,
        squares = [],
        running = void 0;

    var Square = function () {
        function Square() {
            _classCallCheck(this, Square);

            this.x = getRandomNumber(0, canvas.width);
            this.y = 0;
            this.color = getRandomColor();
            this.speed = getRandomNumber(1, 5);
            this.size = 20;
            this.mouse = false;
        }

        _createClass(Square, [{
            key: 'move',
            value: function move() {
                this.y >= canvas.clientHeight ? this.y = 0 : this.y += this.speed;
            }
        }]);

        return Square;
    }();

    var animate = function animate() {

        squares.push(new Square());

        squares.forEach(function (el) {
            el.move();
        });
        redrawCanvas();
        running = requestAnimationFrame(animate);
    };

    var getRandomColor = function getRandomColor() {

        return 'rgb(' + getRandomNumber(0, 255) + ', ' + getRandomNumber(0, 255) + ', ' + getRandomNumber(0, 255) + ')';
    };

    var getRandomNumber = function getRandomNumber(min, max) {

        return Math.floor(Math.random() * (max - min)) + min;
    };

    var updateCanvas = function updateCanvas(e) {

        mouseX = e.clientX;
        mouseY = e.clientY;
        redrawCanvas();
    };

    var catchSquare = function catchSquare() {

        squares.forEach(function (el, i, arr) {

            if (arr[i].mouse == true) {
                squares.splice(i, 1);
                updateCounter(false);
            }
        });

        redrawCanvas();
    };

    var redrawCanvas = function redrawCanvas() {

        clearCanvas();
        squares.forEach(function (el, i, arr) {

            ctx.beginPath();
            ctx.fillStyle = arr[i].color;
            ctx.rect(arr[i].x, arr[i].y, arr[i].size, arr[i].size);

            ctx.isPointInPath(mouseX, mouseY) ? arr[i].mouse = true : arr[i].mouse = false;
            ctx.fill();
        });
    };

    var updateCounter = function updateCounter(clear) {

        clear ? score.innerHTML = 0 : score.innerHTML = parseInt(score.innerHTML) + 1;
    };

    var clearCanvas = function clearCanvas() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    var stopAnimation = function stopAnimation() {

        cancelAnimationFrame(running);
        clearCanvas();
        squares = [];
    };

    var startAnimation = function startAnimation() {

        updateCounter(true);
        animate();
        canvas.addEventListener('mousemove', updateCanvas, false);
        canvas.addEventListener('click', catchSquare, false);
    };

    start.addEventListener('click', startAnimation);

    stop.addEventListener('click', stopAnimation);
})();
