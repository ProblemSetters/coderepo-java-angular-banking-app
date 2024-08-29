import { Directive, ElementRef, Renderer2, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {
  @Input() appDragDrop!: any[];
  @Input() index!: number;
  @Output() appDragDropChange = new EventEmitter<any[]>();

  private draggedIndex: number | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {
    this.draggedIndex = this.index;
    event.dataTransfer?.setData('text/plain', this.index.toString());
    this.renderer.addClass(this.el.nativeElement, 'dragging');
    console.log(`Drag started: index=${this.draggedIndex}`);
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.renderer.addClass(this.el.nativeElement, 'over');
    console.log('Drag over on index:', this.index);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    this.renderer.removeClass(this.el.nativeElement, 'over');
    console.log('Drag leave from index:', this.index);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.renderer.removeClass(this.el.nativeElement, 'dragging');
    this.renderer.removeClass(this.el.nativeElement, 'over');
  
    const droppedIndex = this.index;

    console.log(`Dropped at index=${droppedIndex}, draggedIndex=${this.draggedIndex}`);
  
    if (this.draggedIndex !== null && this.draggedIndex !== droppedIndex) {
      console.log("======")
      // Extract the item from the original position
      const draggedItem = this.appDragDrop[this.draggedIndex];
  
      // Remove item from its original position
      this.appDragDrop.splice(this.draggedIndex, 1);
  
      // Insert it at the new position
      this.appDragDrop.splice(droppedIndex, 0, draggedItem);
  
      console.log('Reordered List:', this.appDragDrop);
  
      // Emit the updated array with a new reference
      this.appDragDropChange.emit([...this.appDragDrop]);
    }
  
    // Clear the dragged index
    this.draggedIndex = null;
  }
  
  @HostListener('dragend', ['$event'])
  onDragEnd(event: DragEvent) {
    this.renderer.removeClass(this.el.nativeElement, 'dragging');
    this.renderer.removeClass(this.el.nativeElement, 'over');
    console.log('Drag ended');
  }
}
