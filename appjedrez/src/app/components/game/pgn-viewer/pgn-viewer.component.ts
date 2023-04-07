import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pgn-viewer',
  templateUrl: './pgn-viewer.component.html',
  styleUrls: ['./pgn-viewer.component.css'],
})
export class PgnViewerComponent {
  @Output() cargar: EventEmitter<boolean> = new EventEmitter<boolean>();

  cargarPgn() {
    this.cargar.emit();
  }
}
