import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostStepComponent } from './post-step.component';

describe('PostStepComponent', () => {
  let component: PostStepComponent;
  let fixture: ComponentFixture<PostStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
