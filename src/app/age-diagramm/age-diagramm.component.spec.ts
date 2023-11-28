import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeDiagrammComponent } from './age-diagramm.component';

describe('AgeDiagrammComponent', () => {
  let component: AgeDiagrammComponent;
  let fixture: ComponentFixture<AgeDiagrammComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgeDiagrammComponent]
    });
    fixture = TestBed.createComponent(AgeDiagrammComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
