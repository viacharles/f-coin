import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenOverlayOutletComponent } from './full-screen-overlay-outlet.component';

describe('FullScreenOverlayOutletComponent', () => {
  let component: FullScreenOverlayOutletComponent;
  let fixture: ComponentFixture<FullScreenOverlayOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullScreenOverlayOutletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullScreenOverlayOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
