import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyPassComponent } from './apply-pass.component';

describe('ApplyPassComponent', () => {
  let component: ApplyPassComponent;
  let fixture: ComponentFixture<ApplyPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyPassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
