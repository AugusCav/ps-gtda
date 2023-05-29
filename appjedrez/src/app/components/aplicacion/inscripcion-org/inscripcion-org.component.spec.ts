import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionOrgComponent } from './inscripcion-org.component';

describe('InscripcionOrgComponent', () => {
  let component: InscripcionOrgComponent;
  let fixture: ComponentFixture<InscripcionOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscripcionOrgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripcionOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
