function changeImage(src) {  
    // 获取  
    var mian = document.getElementById('main');  
    // 更新  
    mian.src = src;  
}

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
      
            function random(min, max) {
              const num = Math.floor(Math.random() * (max - min)) + min;
              return num;
            }
      
            function randomColor() {
              const color =
                "rgb(" +
                random(0, 255) +
                "," +
                random(0, 255) +
                "," +
                random(0, 255) +
                ")";
              return color;
            }
      
            function Ball(x, y, velX, velY, color, size) {//定义球
              this.x = x;
              this.y = y;
              this.velX = velX;
              this.velY = velY;
              this.color = color;
              this.size = size;
            }
            
            Ball.prototype.draw = function () {//绘制球
              ctx.beginPath();
              ctx.fillStyle = this.color;
              ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
              ctx.fill();
            };
      
            Ball.prototype.update = function () {//碰撞检测更新速度为反方向
              if (this.x + this.size >= width) {
                this.velX = -this.velX;
                this.color=randomColor()
              }
      
              if (this.x - this.size <= 0) {
                this.velX = -this.velX;
                this.color=randomColor()
              }
      
              if (this.y + this.size >= height) {
                this.velY = -this.velY;
                this.color=randomColor()
              }
      
              if (this.y - this.size <= 0) {
                this.velY = -this.velY;
                this.color=randomColor()
              }
      
              this.x += this.velX;
              this.y += this.velY;
            };
      
            Ball.prototype.collisionDetect = function () {
              for (let j = 0; j < balls.length; j++) {
                if (this !== balls[j]) {
                  const dx = this.x - balls[j].x;
                  const dy = this.y - balls[j].y;
                  const distance = Math.sqrt(dx * dx + dy * dy);
      
                  if (distance < this.size + balls[j].size) {
                    balls[j].color = this.color = randomColor();
                    const separationFactor = 0.1; // 这个值也可以调整  
                    this.velX +=  separationFactor;  
                    this.velY +=  separationFactor;
                    this.velX = -this.velX;
                    this.velY = -this.velY;
                   
                  }
                }
              }
            };
      
            let balls = [];
      
            while (balls.length < 20) {//生成很多球
              const size = 20;//固定大小
              let ball = new Ball(
                random(0 + size, width - size), 
                random(0 + size, height - size),
                1,//生成的速度
                1,
                randomColor(),//生成的颜色
                size,
              );
              balls.push(ball);//放进列表
            }
      
            function loop() {
              ctx.fillStyle = "rgba(0,0,0,0.25)";
              ctx.fillRect(0, 0, width, height);
      
              for (let i = 0; i < balls.length; i++) {
                balls[i].draw();
                balls[i].update();
                balls[i].collisionDetect();
              }
      
              requestAnimationFrame(loop);//动画循环
            }
      
            loop();


