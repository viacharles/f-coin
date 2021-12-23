import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoiningConsoleComponent } from './coining-console.component';

describe('CoiningConsoleComponent', () => {
  let component: CoiningConsoleComponent;
  let fixture: ComponentFixture<CoiningConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoiningConsoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoiningConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
