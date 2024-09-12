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
  @Input() draggableItem: any; // The item being dragged (can be from table or dropdown)
  @Input() list: Array<any> = []; // The table list to which the items are added
  @Output() listChange = new EventEmitter<Array<any>>(); // Emit changes when list is updated

  private dragStartIndex!: number; // For tracking index when dragging starts

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Make the element draggable
    this.renderer.setAttribute(this.el.nativeElement, "draggable", "true");
  }

  // When dragging starts
  @HostListener("dragstart", ["$event"])
  onDragStart(event: DragEvent) {
    this.dragStartIndex = this.list.indexOf(this.draggableItem);

    if (this.dragStartIndex !== -1) {
      // If the item is from the table, store its index in dataTransfer
      event.dataTransfer?.setData("text/plain", this.dragStartIndex.toString());
    } else {
      // If the item is from dropdown (new item), mark it as a "new-item"
      event.dataTransfer?.setData("text/plain", "new-item");
    }

    // Add styling for dragging
    this.renderer.addClass(this.el.nativeElement, "dragging-background");
    setTimeout(() => {
      this.renderer.setStyle(this.el.nativeElement, "opacity", "0.5");
    }, 0);
  }

  // When dragging ends
  @HostListener("dragend")
  onDragEnd() {
    // Remove styling after dragging ends
    this.renderer.removeClass(this.el.nativeElement, "dragging-background");
    this.renderer.setStyle(this.el.nativeElement, "opacity", "1");
  }

  // Allow drop by preventing default dragover behavior
  @HostListener("dragover", ["$event"])
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  // Handle drop logic
  @HostListener("drop", ["$event"])
  onDrop(event: DragEvent) {
    event.preventDefault();
    const data = event.dataTransfer?.getData("text/plain");

    if (data === "new-item") {
      // If item is coming from the dropdown (not in the table yet)
      const existingItem = this.list.find(
        (item) =>
          item.beneficiaryAccountId === this.draggableItem.beneficiaryAccountId
      );

      // If the item is not already in the table, add it
      if (!existingItem) {
        this.list.push(this.draggableItem);
        this.listChange.emit(this.list); // Emit list change after adding the new item
        console.log("New item added:", this.draggableItem);
      } else {
        console.log("Item already exists in the table.");
      }
    } else {
      // If the item is from the table (swap positions logic)
      const dragEndIndex = this.list.indexOf(this.draggableItem);
      const startIndex = +data!; // Get the starting index from drag start

      if (startIndex !== dragEndIndex) {
        // Swap the items in the list
        [this.list[startIndex], this.list[dragEndIndex]] = [
          this.list[dragEndIndex],
          this.list[startIndex],
        ];

        // Emit the updated list after swapping
        this.listChange.emit(this.list);
        console.log("Swapped items in table:", this.list);
      }
    }
  }
}
