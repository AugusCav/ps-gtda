import {
  Component,
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  Observable,
  OperatorFunction,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs';
import { TipoTorneo } from 'src/app/models/tipo-torneo';
import { Torneo } from 'src/app/models/torneo';
import { TorneoService } from 'src/app/services/torneo.service';

interface TorneoFiltrado {
  id: string;
  nombre: string;
  tipo: string;
  fechaInicio: string;
  fechaFinal: string;
  eloMinimo: number;
  eloMaximo: number;
  localidad: string;
}

export type SortColumn = keyof TorneoFiltrado | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

const compare = (v1: string | number | Date, v2: string | number | Date) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class NgbdSortableHeader {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

//Componente base
@Component({
  selector: 'app-listado-torneo',
  templateUrl: './listado-torneo.component.html',
  styleUrls: ['./listado-torneo.component.css'],
})
export class ListadoTorneoComponent implements OnInit {
  torneos: Torneo[] = [];
  torneosFiltrados: TorneoFiltrado[] = [];
  tabla: TorneoFiltrado[] = [];
  filtroAvanzadoForm!: FormGroup;
  tipos: TipoTorneo[] = [];
  page: number = 1;
  pageSize: number = 10;
  localidades: string[] = [];
  localidad: any;
  avanzado: boolean = false;
  busquedaSimple: string = '';

  @ViewChildren(NgbdSortableHeader) headers:
    | QueryList<NgbdSortableHeader>
    | undefined;

  onSort({ column, direction }: SortEvent) {
    this.headers!.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction === '' || column === '') {
      this.tabla = this.torneosFiltrados;
    } else {
      this.tabla = [...this.torneosFiltrados].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.localidades
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );

  constructor(
    private torneoService: TorneoService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.filtroAvanzadoForm = this.fb.group({
      nombre: [''],
      fechaInicio: [''],
      fechaFinal: [''],
      eloMinimo: [],
      eloMaximo: [],
    });

    this.torneoService.getAll().subscribe({
      next: (res) => {
        this.torneos = res;
        this.torneosFiltrados = this.torneos.map((el) => ({
          id: el.id,
          nombre: el.nombre,
          tipo: el.tipoTorneo.nombre,
          fechaInicio: el.fechaInicio,
          fechaFinal: el.fechaFinal,
          eloMaximo: el.eloMaximo,
          eloMinimo: el.eloMinimo,
          localidad: el.localidad,
        })) as TorneoFiltrado[];

        this.tabla = this.torneosFiltrados;
        console.log(this.torneosFiltrados);

        res.forEach((torneo) => {
          if (this.localidades.length != 0) {
            if (
              this.localidades.find((x) => x == torneo.localidad) == undefined
            ) {
              this.localidades.push(torneo.localidad);
            }
          } else {
            this.localidades.push(torneo.localidad);
          }
        });
        this.localidades.sort();
      },
      error: () => {
        this.toastr.error('Ocurrió un error al cargar los torneos');
      },
    });
  }

  goToTorneo(torneoId: string) {
    this.router.navigate(['/app/torneo/detalles', torneoId]);
  }

  changeList(page: number) {
    this.page = page;
  }

  filtroAvanzado() {
    this.torneosFiltrados = this.torneos
      .filter((torneo) => {
        let aceptado = true;
        if (this.filtroNombre != '' && this.filtroNombre != null) {
          if (
            torneo.nombre
              .toLowerCase()
              .includes(this.filtroNombre.toLowerCase())
          ) {
            aceptado = true;
          } else {
            return false;
          }
        }
        if (this.filtroFechaIni != '' && this.filtroFechaIni != null) {
          if (
            Date.parse(this.filtroFechaIni) <= Date.parse(torneo.fechaInicio)
          ) {
            aceptado = true;
          } else {
            return false;
          }
        }
        if (this.filtroFechaFin != '' && this.filtroFechaFin != null) {
          if (
            Date.parse(this.filtroFechaFin) >= Date.parse(torneo.fechaFinal)
          ) {
            aceptado = true;
          } else {
            return false;
          }
        }
        if (
          this.filtroEloMin != 0 &&
          this.filtroEloMin != null &&
          this.filtroEloMin > 0
        ) {
          if (this.filtroEloMin <= torneo.eloMinimo) {
            aceptado = true;
          } else {
            return false;
          }
        }
        if (
          this.filtroEloMax != 0 &&
          this.filtroEloMax != null &&
          this.filtroEloMax > 0
        ) {
          if (this.filtroEloMax >= torneo.eloMaximo) {
            aceptado = true;
          } else {
            return false;
          }
        }
        if (this.localidad != null && this.localidad != '') {
          if (this.localidad == torneo.localidad) {
            aceptado = true;
          } else {
            return false;
          }
        }
        return aceptado;
      })
      .map((el) => ({
        id: el.id,
        nombre: el.nombre,
        tipo: el.tipoTorneo.nombre,
        fechaInicio: el.fechaInicio,
        fechaFinal: el.fechaFinal,
        eloMaximo: el.eloMaximo,
        eloMinimo: el.eloMinimo,
        localidad: el.localidad,
      })) as TorneoFiltrado[];

    this.tabla = this.torneosFiltrados;
  }

  cambiarBusqueda() {
    this.avanzado = !this.avanzado;
  }

  busqueda() {
    this.torneosFiltrados = this.torneos
      .filter((torneo) =>
        torneo.nombre.toLowerCase().includes(this.busquedaSimple.toLowerCase())
      )
      .map((el) => ({
        id: el.id,
        nombre: el.nombre,
        tipo: el.tipoTorneo.nombre,
        fechaInicio: el.fechaInicio,
        fechaFinal: el.fechaFinal,
        eloMaximo: el.eloMaximo,
        eloMinimo: el.eloMinimo,
        localidad: el.localidad,
      })) as TorneoFiltrado[];

    this.tabla = this.torneosFiltrados;
  }

  quitarFiltros() {
    this.torneosFiltrados = this.torneos.map((el) => ({
      id: el.id,
      nombre: el.nombre,
      tipo: el.tipoTorneo.nombre,
      fechaInicio: el.fechaInicio,
      fechaFinal: el.fechaFinal,
      eloMaximo: el.eloMaximo,
      eloMinimo: el.eloMinimo,
      localidad: el.localidad,
    })) as TorneoFiltrado[];
    this.tabla = this.torneosFiltrados;
    this.filtroAvanzadoForm.reset();
    this.localidad = null;
  }

  get filtroNombre() {
    return this.filtroAvanzadoForm.controls['nombre'].value;
  }
  get filtroFechaIni() {
    return this.filtroAvanzadoForm.controls['fechaInicio'].value;
  }
  get filtroFechaFin() {
    return this.filtroAvanzadoForm.controls['fechaFinal'].value;
  }
  get filtroEloMin() {
    return this.filtroAvanzadoForm.controls['eloMinimo'].value;
  }
  get filtroEloMax() {
    return this.filtroAvanzadoForm.controls['eloMaximo'].value;
  }
}
