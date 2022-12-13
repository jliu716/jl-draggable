import { Component, HostListener, Input, OnInit } from "@angular/core";

@Component({
  selector: "jl-draggable",
  templateUrl: "./draggable.component.html",
  styleUrls: ["./draggable.component.less"],
})
export class DraggableComponent implements OnInit {
  @Input() DEBUG: boolean = true;
  DEBUG_Y = () => Math.round(this.top);
  DEBUG_X = () => Math.round(this.left);

  @Input("width") width: number = 50;
  @Input("height") height: number = 50;
  @Input("left") left: number = 0;
  @Input("top") top: number = 0;
  @Input("color") color: string = "";

  private mouse!: { x: number; y: number };
  private pointOfClick!: { x0: number; y0: number; x1: number; y1: number };
  public isMoving: boolean = false;

  get transform() {
    return "translate3d(" + this.left + "px," + this.top + "px," + "0px)";
  }

  constructor() {}

  ngOnInit() {}

  onMouseDown(event: MouseEvent) {
    this.isMoving = true;
    this.pointOfClick = {
      x0: this.left,
      x1: event.clientX,
      y0: this.top,
      y1: event.clientY,
    };
  }

  onMouseUp() {
    this.isMoving = false;
  }

  @HostListener("window:mousemove", ["$event"])
  onMouseMove(event: MouseEvent) {
    this.mouse = { x: event.clientX, y: event.clientY };
    if (this.isMoving) {
      this.move();
    }
  }

  // calculate new position
  private move() {
    this.top = this.pointOfClick.y0 + (this.mouse.y - this.pointOfClick.y1);
    this.left = this.pointOfClick.x0 + (this.mouse.x - this.pointOfClick.x1);
  }
}
