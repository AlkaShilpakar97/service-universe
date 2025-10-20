import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationHomePageComponent } from './education-home-page.component';

describe('EducationHomePageComponent', () => {
  let component: EducationHomePageComponent;
  let fixture: ComponentFixture<EducationHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
