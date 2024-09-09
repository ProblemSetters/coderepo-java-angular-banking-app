import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[appDragDrop]",
})
export class DragDropDirective {
  @Input() draggableItem: any;
  @Input() list: Array<any> = [];
  @Output() listChange = new EventEmitter<Array<any>>();

  private dragStartIndex!: number;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setAttribute(this.el.nativeElement, "draggable", "true");
  }

  @HostListener("dragstart", ["$event"])
  onDragStart(event: DragEvent) {
    this.dragStartIndex = this.list.indexOf(this.draggableItem);
    event.dataTransfer?.setData("text/plain", this.dragStartIndex.toFixed());

    this.renderer.addClass(this.el.nativeElement, "dragging-background");

    setTimeout(() => {
      this.renderer.setStyle(this.el.nativeElement, "opacity", "0.5");
    }, 0);

    console.log("drag start index==>", this.dragStartIndex);
  }

  @HostListener("dragend")
  onDragEnd() {
    this.renderer.removeClass(this.el.nativeElement, "dragging-background");
    setTimeout(() => {
      this.renderer.setStyle(this.el.nativeElement, "opacity", "0.8");
    }, 100);
  }

  @HostListener("dragover", ["$event"])
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  @HostListener("drop", ["$event"])
  onDrop(event: DragEvent) {
    event.preventDefault();
    const dragEndIndex = this.list.indexOf(this.draggableItem);
    const startIndex = +event.dataTransfer?.getData("text/plain")!;

    if (startIndex !== dragEndIndex) {
      const swapItems = (a: number, b: number): void => {
        const tempArray = [...this.list];
        [tempArray[a], tempArray[b]] = [tempArray[b], tempArray[a]];
        this.list = [...tempArray];
      };

      const intermediateStartIndex = startIndex === 0 ? 1 : startIndex;
      const intermediateEndIndex =
        dragEndIndex === this.list.length - 1 ? dragEndIndex - 1 : dragEndIndex;

      if (Math.abs(intermediateStartIndex - intermediateEndIndex) !== 0) {
        swapItems(intermediateStartIndex, intermediateEndIndex);
      }

      if (this.listChange) {
        setTimeout(() => {
          this.listChange.emit([...this.list]);
        }, 100);
      }
    }

    console.log("dropped index ==>", dragEndIndex);
  }
}
