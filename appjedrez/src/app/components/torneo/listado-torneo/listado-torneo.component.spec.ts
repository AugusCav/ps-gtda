import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTorneoComponent } from './listado-torneo.component';

describe('ListadoTorneoComponent', () => {
  let component: ListadoTorneoComponent;
  let fixture: ComponentFixture<ListadoTorneoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoTorneoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoTorneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
