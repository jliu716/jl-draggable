import { Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
})
export class AppComponent {
  @ViewChild("container") container?: ElementRef;
  containerLoaded: boolean = false;

  DEBUG: boolean = true;

  get boxWidth() {
    return this.container?.nativeElement.clientWidth;
  }

  get boxHeight() {
    return this.container?.nativeElement.clientHeight;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.container !== undefined) {
        this.containerLoaded = true;
      }
    });
  }
}
