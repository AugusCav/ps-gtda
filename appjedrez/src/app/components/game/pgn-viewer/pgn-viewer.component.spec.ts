import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgnViewerComponent } from './pgn-viewer.component';

describe('PgnViewerComponent', () => {
  let component: PgnViewerComponent;
  let fixture: ComponentFixture<PgnViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgnViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgnViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
