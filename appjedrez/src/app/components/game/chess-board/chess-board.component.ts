import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { GameService } from '../../../services/game.service';

declare var Chessboard: any;
@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css'],
})
export class ChessBoardComponent implements OnInit, OnChanges {
  @Input() move: string = '';
  @Input() cargado: string = '';
  board: any = null;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {

    var config = {
      pieceTheme: '../../../../assets/img/chesspieces/wikipedia/{piece}.png',
      position: this.position(),
    };

    this.board = Chessboard('board', config);
    this.updateStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['move'] !== undefined) {
      if (!changes['move'].isFirstChange()) {
        this.board.position(this.move);
      }
    }

    if (changes['cargado'] !== undefined) {
      if (
        !changes['cargado'].isFirstChange() &&
        changes['cargado'].currentValue !== changes['cargado'].previousValue
      ) {
        this.board.position(this.cargado);
      }
    }
  }

  position() {
    return this.gameService.position();
  }

  updateStatus() {
    this.gameService.updateStatus();
  }
}
