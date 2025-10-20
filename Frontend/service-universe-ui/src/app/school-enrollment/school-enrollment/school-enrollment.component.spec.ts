import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolEnrollmentComponent } from './school-enrollment.component';

describe('SchoolEnrollmentComponent', () => {
  let component: SchoolEnrollmentComponent;
  let fixture: ComponentFixture<SchoolEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolEnrollmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
