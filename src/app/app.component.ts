import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private animation;
  private keys = [];
  private speed = 2;
  private x = 50;
  private y = 50;
  private velY = 0;
  private velX = 0;
  private friction = .8;
  ctx;
  canvas;

  ngOnInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('play-canvas');
    this.ctx = this.canvas.getContext('2d');
    // this.animation = new CanvasAnimation(this.canvas);
    this.update();
  }

  update() {
    window.requestAnimationFrame(() => this.update());

    if (this.keys[38]) {
      if (this.velY > -this.speed) {
        this.velY--;
      }
    }

    if (this.keys[40]) {
      if (this.velY < this.speed) {
        this.velY++;
      }
    }

    // ->
    if (this.keys[39]) {
      if (this.velX < this.speed) {
        this.velX++;
      }
    }
    if (this.keys[37]) {
      if (this.velX > -this.speed) {
        this.velX--;
      }
    }

    this.velY *= this.friction;
    this.y += this.velY;
    this.velX *= this.friction;
    this.x += this.velX;

    if (this.x >= 295) {
      this.x = 295;
    } else if (this.x <= 5) {
      this.x = 5;
    }

    if (this.y > 295) {
      this.y = 295;
    } else if (this.y <= 5) {
      this.y = 5;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(this.x, this.y, 20, 20);
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(e: KeyboardEvent) {
    this.keys[e.keyCode] = false;
  }

  @HostListener('window:keydown', ['$event'])
  keyDown(e: KeyboardEvent) {
    this.keys[e.keyCode] = true;
  }

  // @HostListener('window:keyup', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    // PRESS LEFT ARROW OR 'A' KEY
    if (event.keyCode === 37 || event.keyCode === 65) {
      this.animation.x -= 3;
    } else
    // PRESS UP ARROW OR 'W' KEY
    if (event.keyCode === 38 || event.keyCode === 87) {
      this.animation.y -= 3;
    } else
    // PRESS RIGHT ARROW OR 'D' KEY
    if (event.keyCode === 39 || event.keyCode === 68) {
      this.animation.x += 3;
      // console.log(this.animation.x);
    } else
    // PRESS DOWN ARROW OR 'S' KEY
    if (event.keyCode === 40 || event.keyCode === 83) {
      this.animation.y += 3;
    }
  }
}

