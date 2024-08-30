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
    event.dataTransfer?.setData("text/plain", this.dragStartIndex.toString());

    this.renderer.addClass(this.el.nativeElement, "dragging-background");

    setTimeout(() => {
      this.renderer.setStyle(this.el.nativeElement, "opacity", "0.5");
    }, 0);

    console.log("drag start index==>", this.dragStartIndex);
  }

  @HostListener("dragend")
  onDragEnd() {
    this.renderer.removeClass(this.el.nativeElement, "dragging-background");
    this.renderer.setStyle(this.el.nativeElement, "opacity", "1");
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
      // Swap the items
      [this.list[startIndex], this.list[dragEndIndex]] = [
        this.list[dragEndIndex],
        this.list[startIndex],
      ];

      // Emit the updated list
      this.listChange.emit(this.list);
    }

    console.log("dropped index==>", dragEndIndex);
  }
}
