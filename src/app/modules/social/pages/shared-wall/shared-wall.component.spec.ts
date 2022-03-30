import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedWallComponent } from './shared-wall.component';

describe('SharedWallComponent', () => {
  let component: SharedWallComponent;
  let fixture: ComponentFixture<SharedWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedWallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
