import { Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
})
export class AppComponent {
  // TODO:- what happens when box resizes and the tile is outside the box?
  @ViewChild("container") container?: ElementRef;

  DEBUG: boolean = false;

  get boxWidth() {
    return this.container?.nativeElement.clientWidth;
  }

  get boxHeight() {
    return this.container?.nativeElement.clientHeight;
  }
}
