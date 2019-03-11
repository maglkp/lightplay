import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private keys = [];
  private speed = .1;
  private x = 50;
  private y = 50;
  private velY = 0;
  private velX = 0;
  private friction = .8;
  private ctx;
  private canvas;

  private worldMap: number[][] =
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 4, 0, 0, 0, 0, 5, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 4, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

  // 1-red, 2-green, 3-blue, 4-white, 0-yellow
  private colors: Map<number, number[]> = new Map([[1, [255, 0, 0]], [2, [0, 255, 0]], [3, [0, 0, 255]],
    [4, [255, 255, 255]], [0, [189, 204, 11]]]);
  private posX = 22.;
  private posY = 12.;
  private mapWidth = 24;
  private mapHeight = 24;

  ngOnInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('play-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // this.drawScene();
    this.draw3dScene();
  }

  drawScene() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const dirX = -1.;
    const dirY = 0.; // initial direction vector
    const planeX = 0.;
    const planeY = 0.66; // the 2d raycaster version of camera plane
    const w = 512;
    const h = 384;

    for (let x = 0; x < w; x++) {

      const cameraX = 2 * x / w - 1; // x-coordinate in camera space
      const rayDirX = dirX + planeX * cameraX;
      const rayDirY = dirY + planeY * cameraX;
      // which box of the map we're in
      let mapX = Math.floor(this.posX);
      let mapY = Math.floor(this.posY);

      // length of ray from current position to next x or y-side
      let sideDistX;
      let sideDistY;

      // length of ray from one x or y-side to next x or y-side
      const deltaDistX = Math.abs(1 / rayDirX);
      const deltaDistY = Math.abs(1 / rayDirY);
      let perpWallDist;

      let stepX;
      let stepY;

      let hit = 0; // was there a wall hit?
      let side; // was a NS or a EW wall hit?

      // calculate step and initial sideDist
      if (rayDirX < 0) {
        stepX = -1;
        sideDistX = (this.posX - mapX) * deltaDistX;
      } else {
        stepX = 1;
        sideDistX = (mapX + 1.0 - this.posX) * deltaDistX;
      }
      if (rayDirY < 0) {
        stepY = -1;
        sideDistY = (this.posY - mapY) * deltaDistY;
      } else {
        stepY = 1;
        sideDistY = (mapY + 1.0 - this.posY) * deltaDistY;
      }

      // perform DDA
      while (hit === 0) {
        // jump to next map square, OR in x-direction, OR in y-direction
        if (sideDistX < sideDistY) {
          sideDistX += deltaDistX;
          mapX += stepX;
          side = 0;
        } else {
          sideDistY += deltaDistY;
          mapY += stepY;
          side = 1;
        }
        // Check if ray has hit a wall
        if (this.worldMap[mapX][mapY] > 0) {
          hit = 1;
        }
      }
      if (side === 0) {
        perpWallDist = (mapX - this.posX + (1 - stepX) / 2) / rayDirX;
      } else {
        perpWallDist = (mapY - this.posY + (1 - stepY) / 2) / rayDirY;
      }

      // Calculate height of line to draw on screen
      const lineHeight = Math.floor(h / perpWallDist);

      // calculate lowest and highest pixel to fill in current stripe
      let drawStart = -lineHeight / 2 + h / 2;
      if (drawStart < 0) {
        drawStart = 0;
      }
      let drawEnd = lineHeight / 2 + h / 2;
      if (drawEnd >= h) {
        drawEnd = h - 1;
      }

      let color = this.colors.get(this.worldMap[mapX][mapY]);
      // give x and y sides different brightness
      if (side === 1) {
        color = [color[0] / 2, color[1] / 2, color[2] / 2];
      }

      // draw the pixels of the stripe as a vertical line
      this.verLine(x, drawStart, drawEnd, 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')');
    }
  }

  draw3dScene() {
    window.requestAnimationFrame(() => this.draw3dScene());

    // U
    if (this.keys[38]) {
      if (this.velY > -this.speed) {
        this.velY--;
      }
    }

    // D
    if (this.keys[40]) {
      if (this.velY < this.speed) {
        this.velY++;
      }
    }

    // R
    if (this.keys[39]) {
      if (this.velX < this.speed) {
        this.velX++;
      }
    }
    // L
    if (this.keys[37]) {
      if (this.velX > -this.speed) {
        this.velX--;
      }
    }

    this.velY *= this.friction;
    this.posY += this.velY;
    this.velX *= this.friction;
    this.posX += this.velX;

    this.posX = Math.min(this.posX, this.mapWidth);
    this.posX = Math.max(this.posX, 0);
    this.posY = Math.min(this.posY, this.mapHeight);
    this.posY = Math.max(this.posY, 0);

    this.drawScene();
  }

  drawRectangleInBox() {
    window.requestAnimationFrame(() => this.drawRectangleInBox());

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

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = this.getRandomColor();
    this.ctx.fillRect(this.x, this.y, 20, 20);
  }

  drawRectangles() {
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        this.ctx.fillStyle = this.getRandomColor();
        this.ctx.fillRect(i * 20, j * 20, 20, 20);
      }
    }
  }

  verLine(x, drawStart, drawEnd, color) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.moveTo(x, drawStart);
    this.ctx.lineTo(x, drawEnd);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  getRandomColor() {
    const r = 255 * Math.random() | 0,
      g = 255 * Math.random() | 0,
      b = 255 * Math.random() | 0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
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

