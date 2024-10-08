import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game.service';
import { TorneoService } from 'src/app/services/torneo.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-pgn-viewer',
  templateUrl: './pgn-viewer.component.html',
  styleUrls: ['./pgn-viewer.component.css'],
})
export class PgnViewerComponent implements OnInit {
  @Output() cargar: EventEmitter<boolean> = new EventEmitter<boolean>();
  idPartida: string | null = '';
  cargarPgnFlag = true;
  Pgncargado: boolean = false;
  pgn: string = '';
  esOrganizador: boolean = false;
  idUser: string = '';
  ganador: number | null = null;

  constructor(
    private torneoService: TorneoService,
    private gameService: GameService,
    private userStore: UserStoreService,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.idPartida = this.torneoService.idPartida;

    this.userStore.getIdFromStore().subscribe((val) => {
      let idFromToken = this.auth.getIdFromToken();
      this.idUser = val || idFromToken;
    });

    this.torneoService.getPartida(this.idPartida!).subscribe({
      next: (res) => {
        if (res.pgn !== null) {
          this.Pgncargado = true;
        }
        if (res.idRondaNavigation.torneo.idOrganizador === this.idUser) {
          this.esOrganizador = true;
        }
      },
    });
  }

  cargarPgn() {
    if (this.pgn != null && this.ganador != null) {
      if (this.ganador >= -1 && this.ganador <= 1) {
        this.torneoService
          .cargarPgn(this.idPartida, this.pgn, this.ganador)
          .subscribe({
            next: (res) => {
              this.cargarPgnFlag = true;
              window.location.reload();
            },
            error: (err) => {
              this.toastr.error(err.error.message, 'Error');
            },
          });
      } else {
        this.toastr.error('Escoja un ganador válido');
      }
    } else {
      this.toastr.error('Pgn o ganador inválidos');
    }
  }

  abrirModal() {
    this.cargarPgnFlag = !this.cargarPgnFlag;
  }
}
