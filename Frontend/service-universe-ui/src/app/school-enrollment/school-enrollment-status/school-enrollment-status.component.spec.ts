import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolEnrollmentStatusComponent } from './school-enrollment-status.component';

describe('SchoolEnrollmentStatusComponent', () => {
  let component: SchoolEnrollmentStatusComponent;
  let fixture: ComponentFixture<SchoolEnrollmentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolEnrollmentStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolEnrollmentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
