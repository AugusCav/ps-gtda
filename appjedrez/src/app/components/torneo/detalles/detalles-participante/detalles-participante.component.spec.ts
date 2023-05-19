import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesParticipanteComponent } from './detalles-participante.component';

describe('DetallesParticipanteComponent', () => {
  let component: DetallesParticipanteComponent;
  let fixture: ComponentFixture<DetallesParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesParticipanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
