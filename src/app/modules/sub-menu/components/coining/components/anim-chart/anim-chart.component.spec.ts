import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimChartComponent } from './anim-chart.component';

describe('AnimChartComponent', () => {
  let component: AnimChartComponent;
  let fixture: ComponentFixture<AnimChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
