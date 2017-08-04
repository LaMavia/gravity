//Variables
let grav = 1;
let lift = -0.92*2;
let pull = 1.1;
let windForce = 1.2;
let W = window.innerWidth;
let H = window.innerHeight;
    console.log(H);
let balls = [];
//Functions
const num = {
        random: (max, min = 1) => {
            return Math.floor(Math.random() * (max - min) + min);
        }
    }
function Ball(index,x, y){
    this.x = x || num.random(W);
        this.dx = 0;
    this.y = y || num.random(H / 10);
        this.dy = 0;
    this.r = num.random(220, 50);
    this.mass = this.r / 100;
    this.vel = 0;
    this.slide = 0;
    this.frX = 0.9;
    this.frY = 0.8;
    this.f = 5;
    this.id = index;
    this.show = () => {
        let el = document.createElement("span");
        document.body.appendChild(el);
        switch(index){
            case 0: this.id = "zero";break;
            case 1: this.id = "one";break;
            case 2: this.id = "two";break;
            case 3: this.id = "three";break;
            case 4: this.id = "four";break;
            case 5: this.id = "five";break;
            case 6: this.id = "six";break;
        }
        el.setAttribute('class', 'ball');
        el.setAttribute('id', this.id);
        el.style.setProperty('--size', this.r);
    }
    this.events = () => {
        console.log('Setting events');
        let keys = document.querySelector('div.keys').children;
        keys[1].addEventListener('click', this.boost, true);
        keys[3].addEventListener('click', ()=>{this.move(-1)}, true);
        keys[5].addEventListener('click',  ()=>{this.move(1)}, true);
        document.addEventListener('keydown', this.keyHandles, true);
        window.addEventListener('resize', () =>{
            W = window.innerWidth;
            H = window.innerHeight;
        });
    }
    this.keyHandles = (e) => {
        switch(e.keyCode){
            case 65, 37: e.preventDefault(), this.move(-1);break;
            case 68, 39: e.preventDefault(), this.move(1);break;
            case 32, 38: e.preventDefault(), this.boost();break;
        }
    }
    this.updateColors = () =>{
        let elem = document.querySelector('span.ball').style;
        //Color
        let r = num.random(255, 20);
        let g = num.random(255, 0);
        let b = num.random(255, 20);
            elem.setProperty('--bg', `rgb(${r},${g},${b})`);
    }
    this.change = () => {
        this.r = num.random(200,20);
        this.updateColors();
    }
    this.move = (v) => {
        this.dx += this.f * v;
    }
    this.boost = (e) => {
        if(this.y <= H - this.r * 2 || this.y >= H - this.r){
            this.dy -= 45;
        }
        
        
    }
    this.ver = (e) => {
        this.dy += Math.round(grav * this.mass);
        this.y += this.dy;
        if(this.y >= H - this.r){
            this.y = H - this.r;
            this.dy = -this.dy;
            this.dy *= this.frY;
            Math.round(this.dy);
            this.y += this.dy;
            if(this.y <= H - 1){
                this.y = H - this.r;
            }
        }
        if(this.y <= 0){
            this.y = 0;
            this.dy = -this.dy;
            this.change();
        }
    }
    this.hor = (e) => {
        this.x += this.dx;
        this.dx *= 0.99;
        if(this.x < 0){
            this.x = 0;
            this.dx = -this.dx; 
            this.dx *= this.frX;
        }
        if(this.x >= W - this.r){
            this.x = W - this.r;
            this.dx = -this.dx; 
            this.dx *= this.frX;
        }
    }
    this.update = () => {
        this.ver();
        this.hor();
        document.querySelector(`#${this.id}`).style.setProperty('--x', this.x);
        document.querySelector(`#${this.id}`).style.setProperty('--y', this.y);
        document.querySelector(`#${this.id}`).style.setProperty('--size', this.r);
        requestAnimationFrame(this.update);
    }
}
(function setUp(){
    for(i = 0; i < 1; i++){
        balls.push(new Ball(i));
        balls[i].show();
        balls[i].events();
        balls[i].update();
        console.log(balls[i].y);
    }
})();
//events 