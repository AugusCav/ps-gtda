import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneosOrganizadorComponent } from './torneos-organizador.component';

describe('TorneosOrganizadorComponent', () => {
  let component: TorneosOrganizadorComponent;
  let fixture: ComponentFixture<TorneosOrganizadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TorneosOrganizadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorneosOrganizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
