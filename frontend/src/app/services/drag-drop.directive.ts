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
  @Input() draggableItem: any; // The item being dragged (from table or dropdown)
  @Input() list: Array<any> = []; // The table list to which the items are added
  @Output() listChange = new EventEmitter<Array<any>>(); // Emit changes when list is updated

  private dragStartIndex!: number; // For tracking the index of the dragged item in the list

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Make the element draggable
    this.renderer.setAttribute(this.el.nativeElement, "draggable", "true");
  }

  // When dragging starts
  @HostListener("dragstart", ["$event"])
  onDragStart(event: DragEvent) {
    this.dragStartIndex = this.list.indexOf(this.draggableItem);

    if (this.dragStartIndex !== -1) {
      // Item is from the table
      event.dataTransfer?.setData("text/plain", this.dragStartIndex.toString());
      console.log("Dragging item from table:", this.draggableItem);
    } else {
      // Item is from dropdown
      event.dataTransfer?.setData("text/plain", "new-item");
      console.log(
        "Dragging new item from dropdown:",
        this.draggableItem.beneficiary
      );
    }

    // Add dragging style
    this.renderer.addClass(this.el.nativeElement, "dragging-background");
    setTimeout(() => {
      this.renderer.setStyle(this.el.nativeElement, "opacity", "0.5");
    }, 0);
  }

  // When dragging ends
  @HostListener("dragend")
  onDragEnd() {
    // Remove dragging styles
    this.renderer.removeClass(this.el.nativeElement, "dragging-background");
    this.renderer.setStyle(this.el.nativeElement, "opacity", "1");
    console.log("Drag operation ended for item:", this.draggableItem);
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
      // If the item is from the dropdown
      const existingItem = this.list.find(
        (item) =>
          item.beneficiaryAccountId === this.draggableItem.beneficiaryAccountId
      );

      if (!existingItem) {
        // Add the new item to the table
        this.list.push(this.draggableItem.beneficiary); // Using `draggableItem.beneficiary` directly
        this.listChange.emit(this.list); // Emit the updated list
        console.log(
          "New beneficiary added to table:",
          this.draggableItem.beneficiary
        );
      } else {
        console.log("Beneficiary already exists in the table:", existingItem);
      }
    } else {
      // If the item is from the table (perform swap logic)
      const dragEndIndex = this.list.indexOf(this.draggableItem.beneficiary);
      const startIndex = +data!; // Convert start index from string to number

      if (startIndex !== dragEndIndex) {
        // Swap the beneficiaries in the list
        [this.list[startIndex], this.list[dragEndIndex]] = [
          this.list[dragEndIndex],
          this.list[startIndex],
        ];

        // Emit the updated list after swapping
        this.listChange.emit(this.list);
        console.log("Swapped beneficiaries in table:", this.list);
      }
    }
  }
}
