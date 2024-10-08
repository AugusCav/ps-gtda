import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoInscripcionesComponent } from './listado-inscripciones.component';

describe('ListadoInscripcionesComponent', () => {
  let component: ListadoInscripcionesComponent;
  let fixture: ComponentFixture<ListadoInscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoInscripcionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
