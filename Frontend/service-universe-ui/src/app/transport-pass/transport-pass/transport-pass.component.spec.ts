import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportPassComponent } from './transport-pass.component';

describe('TransportPassComponent', () => {
  let component: TransportPassComponent;
  let fixture: ComponentFixture<TransportPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportPassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
