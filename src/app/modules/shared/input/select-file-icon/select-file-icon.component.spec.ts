import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFileIconComponent } from './select-file-icon.component';

describe('FileSelectIconComponent', () => {
  let component: SelectFileIconComponent;
  let fixture: ComponentFixture<SelectFileIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectFileIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFileIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
