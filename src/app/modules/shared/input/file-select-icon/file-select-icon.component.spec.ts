import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSelectIconComponent } from './file-select-icon.component';

describe('FileSelectIconComponent', () => {
  let component: FileSelectIconComponent;
  let fixture: ComponentFixture<FileSelectIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileSelectIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileSelectIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
