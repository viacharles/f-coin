import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FCoinPageComponent } from './f-coin-page.component';

describe('FCoinPageComponent', () => {
  let component: FCoinPageComponent;
  let fixture: ComponentFixture<FCoinPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FCoinPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FCoinPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
