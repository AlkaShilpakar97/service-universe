import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSlotsComponent } from './doctor-slots.component';

describe('DoctorSlotsComponent', () => {
  let component: DoctorSlotsComponent;
  let fixture: ComponentFixture<DoctorSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorSlotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
