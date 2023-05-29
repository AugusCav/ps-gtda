import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigOrganizadoresComponent } from './config-organizadores.component';

describe('ConfigOrganizadoresComponent', () => {
  let component: ConfigOrganizadoresComponent;
  let fixture: ComponentFixture<ConfigOrganizadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigOrganizadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigOrganizadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
