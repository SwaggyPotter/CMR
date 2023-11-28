import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayAndTimeComponent } from './day-and-time.component';

describe('DayAndTimeComponent', () => {
  let component: DayAndTimeComponent;
  let fixture: ComponentFixture<DayAndTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayAndTimeComponent]
    });
    fixture = TestBed.createComponent(DayAndTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
