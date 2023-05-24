import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TorneoService } from 'src/app/services/torneo.service';

@Component({
  selector: 'app-pgn-viewer',
  templateUrl: './pgn-viewer.component.html',
  styleUrls: ['./pgn-viewer.component.css'],
})
export class PgnViewerComponent implements OnInit {
  @Output() cargar: EventEmitter<boolean> = new EventEmitter<boolean>();
  cargado: boolean = false;
  idPartida: string | null = '';

  constructor(private torneoService: TorneoService) {}

  ngOnInit(): void {
    this.idPartida = this.torneoService.idPartida;

    this.torneoService.getPartida(this.idPartida!).subscribe({
      next: (res) => {
        if (res.pgn !== null) {
          this.cargado = true;
        }
      },
    });
  }

  cargarPgn() {
    this.cargar.emit();
  }
}
