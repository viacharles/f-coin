import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoiningComponent } from './coining.component';

describe('CoiningConsoleComponent', () => {
  let component: CoiningComponent;
  let fixture: ComponentFixture<CoiningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoiningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoiningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
