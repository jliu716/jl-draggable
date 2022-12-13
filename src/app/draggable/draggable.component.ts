import {
  Component,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "jl-draggable",
  templateUrl: "./draggable.component.html",
  styleUrls: ["./draggable.component.less"],
})
export class DraggableComponent implements OnChanges {
  // debug properties
  @Input() DEBUG: boolean = true;
  DEBUG_Y = () => Math.round(this.top);
  DEBUG_X = () => Math.round(this.left);

  // box properties
  @Input("width") width: number = 50;
  @Input("height") height: number = 50;
  @Input("left") left: number = 0;
  @Input("top") top: number = 0;
  @Input("color") color: string = "";
  private borderWidth: number = 2;

  // parent properties
  @Input() containerWidth: number = 400;
  @Input() containerHeight: number = 400;

  private mouse!: { x: number; y: number };
  private pointOfClick!: { x0: number; y0: number; x1: number; y1: number };
  public isMoving: boolean = false;

  get transform() {
    return "translate3d(" + this.left + "px," + this.top + "px," + "0px)";
  }

  ngOnChanges(changes: SimpleChanges): void {
    // move box if container has shrinked too much
    if (changes.containerWidth || changes.containerHeight) {
      const isOutside =
        this.left + this.width > this.containerWidth ||
        this.top + this.height > this.containerHeight;
      if (isOutside) this.move();
    }
  }

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
    // top should between 0 and (boxHeight - myHeight)
    let top = this.pointOfClick.y0 + (this.mouse.y - this.pointOfClick.y1);
    top = Math.min(this.containerHeight - this.height - this.borderWidth, top);
    this.top = Math.max(0 - this.borderWidth, top);

    // left should between 0 and (boxWidth - myWidth)
    let left = this.pointOfClick.x0 + (this.mouse.x - this.pointOfClick.x1);
    left = Math.min(this.containerWidth - this.width - this.borderWidth, left);
    this.left = Math.max(0 - this.borderWidth, left);
  }
}
