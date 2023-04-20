import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTorneoComponent } from './registro-torneo.component';

describe('RegistroTorneoComponent', () => {
  let component: RegistroTorneoComponent;
  let fixture: ComponentFixture<RegistroTorneoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroTorneoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroTorneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
