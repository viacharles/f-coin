import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEditImageComponent } from './post-edit-image.component';

describe('PostEditImageComponent', () => {
  let component: PostEditImageComponent;
  let fixture: ComponentFixture<PostEditImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostEditImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostEditImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
