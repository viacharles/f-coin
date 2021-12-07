import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoiningPageComponent } from './coining-page.component';

describe('CoiningPageComponent', () => {
  let component: CoiningPageComponent;
  let fixture: ComponentFixture<CoiningPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoiningPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoiningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
