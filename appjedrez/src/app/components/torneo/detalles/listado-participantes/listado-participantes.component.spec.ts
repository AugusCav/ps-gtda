import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoParticipantesComponent } from './listado-participantes.component';

describe('ListadoParticipantesComponent', () => {
  let component: ListadoParticipantesComponent;
  let fixture: ComponentFixture<ListadoParticipantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoParticipantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoParticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
