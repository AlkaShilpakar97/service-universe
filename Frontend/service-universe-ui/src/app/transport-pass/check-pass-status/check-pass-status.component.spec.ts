import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPassStatusComponent } from './check-pass-status.component';

describe('CheckPassStatusComponent', () => {
  let component: CheckPassStatusComponent;
  let fixture: ComponentFixture<CheckPassStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckPassStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckPassStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
