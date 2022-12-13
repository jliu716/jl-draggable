import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "jl-draggable",
  templateUrl: "./draggable.component.html",
  styleUrls: ["./draggable.component.less"],
})
export class DraggableComponent implements OnInit {
  @Input("width") width: number = 50;
  @Input("height") height: number = 50;
  @Input("left") left: number = 0;
  @Input("top") top: number = 0;
  @Input("color") color: string = "";

  get transform() {
    return "translate3d(" + this.left + "px," + this.top + "px," + "0px)";
  }

  constructor() {}

  ngOnInit() {}
}
