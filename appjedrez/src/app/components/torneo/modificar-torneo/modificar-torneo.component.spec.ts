import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTorneoComponent } from './modificar-torneo.component';

describe('ModificarTorneoComponent', () => {
  let component: ModificarTorneoComponent;
  let fixture: ComponentFixture<ModificarTorneoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarTorneoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarTorneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
