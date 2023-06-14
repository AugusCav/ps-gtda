import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validate-form.helper';
import { Partida } from 'src/app/models/partida';
import { Ronda } from 'src/app/models/ronda';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { TorneoService } from 'src/app/services/torneo.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-rondas',
  templateUrl: './rondas.component.html',
  styleUrls: ['./rondas.component.css'],
})
export class RondasComponent implements OnInit {
  esOrganizador: boolean = false;
  id: string = '';
  idUser: string = '';
  rondas: Ronda[] = [];
  partidas: Partida[] = [];
  rondaForm!: FormGroup;
  partidaForm!: FormGroup;
  usuariosBlancas: Usuario[] = [];
  usuariosNegras: Usuario[] = [];
  estado: string = '';

  constructor(
    private inscripcionService: InscripcionService,
    private torneoService: TorneoService,
    private userStore: UserStoreService,
    private auth: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.torneoService.torneoId;

    this.getDatos();

    if (this.id !== null) {
      this.torneoService.getById(this.id).subscribe({
        next: (res) => {
          if (res.idOrganizador === this.idUser) {
            this.esOrganizador = true;
            this.estado = res.estado;
          } else {
            this.esOrganizador = false;
          }
        },
        error: () => {
          alert('Error al intentar cargar el torneo');
        },
      });

      this.torneoService.getRondas(this.id).subscribe({
        next: (res) => {
          this.rondas = res;
        },
        error: (err) => {
          console.log('error');
        },
      });
    }

    this.rondaForm = this.fb.group({
      numero: [, [Validators.required, Validators.min(1)]],
      descripcion: [, Validators.required],
      idTorneo: [this.id],
      partidas: [],
    });

    this.partidaForm = this.fb.group({
      jugadorBlancas: [,],
      jugadorNegras: [,],
      fecha: ['', Validators.required],
      horaInicio: ['', Validators.required],
    });
  }

  getDatos() {
    this.userStore.getIdFromStore().subscribe((val) => {
      let idFromToken = this.auth.getIdFromToken();
      this.idUser = val || idFromToken;
    });

    this.inscripcionService.getAll(this.id).subscribe({
      next: (res) => {
        res.forEach((i) => {
          var usuario = i.participante;
          this.usuariosBlancas.push(usuario as Usuario);
          this.usuariosNegras.push(usuario as Usuario);
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  agregar() {
    if (this.partidaForm.valid) {
      if (this.validateSelects()) {
        if (!this.jugadoresIguales()) {
          const time = this.partidaForm.get('horaInicio')?.value;
          const formattedTime = time + ':00';
          var partida: Partida;
          if (this.partidaForm.get('jugadorNegras')?.value == null) {
            partida = {
              fecha: this.partidaForm.get('fecha')?.value,
              horaInicio: formattedTime,
              jugadorBlancas: this.partidaForm.get('jugadorBlancas')?.value.id,
              jugadorBlancasNavigation:
                this.partidaForm.get('jugadorBlancas')?.value,
              jugadorNegrasNavigation:
                this.partidaForm.get('jugadorNegras')?.value,
              jugadorNegras: null,
            } as Partida;
          } else if (this.partidaForm.get('jugadorBlancas')?.value == null) {
            partida = {
              fecha: this.partidaForm.get('fecha')?.value,
              horaInicio: formattedTime,
              jugadorBlancas: null,
              jugadorBlancasNavigation:
                this.partidaForm.get('jugadorBlancas')?.value,
              jugadorNegrasNavigation:
                this.partidaForm.get('jugadorNegras')?.value,
              jugadorNegras: this.partidaForm.get('jugadorNegras')?.value.id,
            } as Partida;
          } else {
            partida = {
              fecha: this.partidaForm.get('fecha')?.value,
              horaInicio: formattedTime,
              jugadorBlancas: this.partidaForm.get('jugadorBlancas')?.value.id,
              jugadorBlancasNavigation:
                this.partidaForm.get('jugadorBlancas')?.value,
              jugadorNegrasNavigation:
                this.partidaForm.get('jugadorNegras')?.value,
              jugadorNegras: this.partidaForm.get('jugadorNegras')?.value.id,
            } as Partida;
          }

          this.eliminarUsuariosArray(partida);

          this.partidaForm.reset();
          this.partidaForm.controls['jugadorBlancas'].setValue(
            this.usuariosNegras[0]
          );
          this.partidaForm.controls['jugadorNegras'].setValue(
            this.usuariosBlancas[0]
          );
        }
      }
    } else {
      ValidateForm.validateAllFormFields(this.partidaForm);
      this.toastr.error('Tu form es inválido', 'Error');
    }
  }

  eliminar(partida: Partida) {
    if (partida !== null) {
      if (partida.jugadorBlancasNavigation !== null) {
        this.usuariosBlancas.push(partida.jugadorBlancasNavigation);
        this.usuariosNegras.push(partida.jugadorBlancasNavigation);
      }
      if (partida.jugadorNegrasNavigation !== null) {
        this.usuariosBlancas.push(partida.jugadorNegrasNavigation);
        this.usuariosNegras.push(partida.jugadorNegrasNavigation);
      }
      this.partidas = this.partidas.filter(
        (partidaAEliminar) => partidaAEliminar !== partida
      );
    }
  }

  jugadoresIguales() {
    return (
      this.partidaForm.get('jugadorBlancas')?.value ===
      this.partidaForm.get('jugadorNegras')?.value
    );
  }

  aceptar() {
    if (this.rondaForm.valid) {
      var ronda = this.rondaForm.value as Ronda;
      for (let i = 0; i < this.partidas.length; i++) {
        this.partidas[i].jugadorBlancasNavigation = null;
        this.partidas[i].jugadorNegrasNavigation = null;
      }
      this.torneoService.registrarPartidas(ronda, this.partidas).subscribe({
        next: () => {
          this.toastr.success('Ronda registrada con éxito', 'Éxito');
          this.rondaForm.reset();
          this.partidas.forEach((p) => {
            this.eliminar(p);
          });
          this.partidaForm.reset();
        },
        error: () => {
          this.toastr.error('Error', 'Error');
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.rondaForm);
      this.toastr.error('Tu form es inválido', 'Error');
    }
  }

  validateSelects() {
    var jugadorBlancas = this.partidaForm.controls['jugadorBlancas'].value;
    var jugadorNegras = this.partidaForm.controls['jugadorNegras'].value;
    var isvalid;

    if (!jugadorBlancas && !jugadorNegras) {
      isvalid = false;
    } else {
      isvalid = true;
    }
    return isvalid;
  }

  eliminarUsuariosArray(partida: Partida) {
    if (this.partidaForm.get('jugadorNegras')?.value == null) {
      const usuariosAEliminar = [this.partidaForm.get('jugadorBlancas')?.value];
      this.partidas.push(partida);
      this.usuariosBlancas = this.usuariosBlancas.filter(
        (usuario: Usuario) =>
          !usuariosAEliminar.some(
            (usuarioAEliminar: Usuario) => usuarioAEliminar.id === usuario.id
          )
      );
      this.usuariosNegras = this.usuariosNegras.filter(
        (usuario: Usuario) =>
          !usuariosAEliminar.some(
            (usuarioAEliminar: Usuario) => usuarioAEliminar.id === usuario.id
          )
      );
    } else if (this.partidaForm.get('jugadorBlancas')?.value == null) {
      const usuariosAEliminar = [this.partidaForm.get('jugadorNegras')?.value];
      this.partidas.push(partida);
      this.usuariosBlancas = this.usuariosBlancas.filter(
        (usuario: Usuario) =>
          !usuariosAEliminar.some(
            (usuarioAEliminar: Usuario) => usuarioAEliminar.id === usuario.id
          )
      );
      this.usuariosNegras = this.usuariosNegras.filter(
        (usuario: Usuario) =>
          !usuariosAEliminar.some(
            (usuarioAEliminar: Usuario) => usuarioAEliminar.id === usuario.id
          )
      );
    } else {
      const usuariosAEliminar = [
        this.partidaForm.get('jugadorBlancas')?.value,
        this.partidaForm.get('jugadorNegras')?.value,
      ];
      this.partidas.push(partida);
      this.usuariosBlancas = this.usuariosBlancas.filter(
        (usuario: Usuario) =>
          !usuariosAEliminar.some(
            (usuarioAEliminar: Usuario) => usuarioAEliminar.id === usuario.id
          )
      );
      this.usuariosNegras = this.usuariosNegras.filter(
        (usuario: Usuario) =>
          !usuariosAEliminar.some(
            (usuarioAEliminar: Usuario) => usuarioAEliminar.id === usuario.id
          )
      );
    }
  }
}
