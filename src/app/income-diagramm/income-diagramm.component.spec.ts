import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeDiagrammComponent } from './income-diagramm.component';

describe('IncomeDiagrammComponent', () => {
  let component: IncomeDiagrammComponent;
  let fixture: ComponentFixture<IncomeDiagrammComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncomeDiagrammComponent]
    });
    fixture = TestBed.createComponent(IncomeDiagrammComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
