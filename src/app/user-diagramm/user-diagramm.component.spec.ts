import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDiagrammComponent } from './user-diagramm.component';

describe('UserDiagrammComponent', () => {
  let component: UserDiagrammComponent;
  let fixture: ComponentFixture<UserDiagrammComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDiagrammComponent]
    });
    fixture = TestBed.createComponent(UserDiagrammComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
