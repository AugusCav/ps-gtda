import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesGameComponent } from './detalles-game.component';

describe('DetallesGameComponent', () => {
  let component: DetallesGameComponent;
  let fixture: ComponentFixture<DetallesGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
