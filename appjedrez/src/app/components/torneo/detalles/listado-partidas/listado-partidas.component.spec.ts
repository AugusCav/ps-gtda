import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPartidasComponent } from './listado-partidas.component';

describe('ListadoPartidasComponent', () => {
  let component: ListadoPartidasComponent;
  let fixture: ComponentFixture<ListadoPartidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPartidasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPartidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
