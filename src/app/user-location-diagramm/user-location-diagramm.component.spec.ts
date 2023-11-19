import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLocationDiagrammComponent } from './user-location-diagramm.component';

describe('UserLocationDiagrammComponent', () => {
  let component: UserLocationDiagrammComponent;
  let fixture: ComponentFixture<UserLocationDiagrammComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLocationDiagrammComponent]
    });
    fixture = TestBed.createComponent(UserLocationDiagrammComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
