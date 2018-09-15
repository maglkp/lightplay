import {HostListener} from '@angular/core';

export class CanvasAnimation {
  private readonly ctx: CanvasRenderingContext2D;
  private x = 50;
  private y = 50;
  private velY = 0;
  private velX = 0;
  private friction = 0.98;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext('2d');
    window.requestAnimationFrame(() => this.draw());
    // document.addEventListener('keydown', this.keyboardInput);
    this.x = 51;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(this.x, this.y, 10, 10);
    // console.log(this.x);

    window.requestAnimationFrame(() => this.draw());
  }


}
