import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private keys = [];
  private speed = 9000;
  private x = 50;
  private y = 50;
  private velY = 0;
  private velX = 0;
  private friction = .8;
  private ctx;
  private canvas;

  ngOnInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('play-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.drawSomeRectangles();
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

    if (this.x >= 280) {
      this.x = 280;
    } else if (this.x <= 0) {
      this.x = 0;
    }

    if (this.y > 280) {
      this.y = 280;
    } else if (this.y <= 0) {
      this.y = 0;
    }

    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = this.getRandomColor();
    this.ctx.fillRect(this.x, this.y, 20, 20);
  }

  drawSomeRectangles() {
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        this.ctx.fillStyle = this.getRandomColor();
        this.ctx.fillRect(i * 20, j * 20, 20, 20);
      }
    }
  }

  getRandomColor() {
    let r = 255 * Math.random() | 0,
      g = 255 * Math.random() | 0,
      b = 255 * Math.random() | 0;
    return 'rgb(' + r + ',' + g + ',' + 0 + ')';
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(e: KeyboardEvent) {
    this.keys[e.keyCode] = false;
  }

  @HostListener('window:keydown', ['$event'])
  keyDown(e: KeyboardEvent) {
    this.keys[e.keyCode] = true;
  }
}

