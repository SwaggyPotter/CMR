import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserAdressDialogComponent } from './edit-user-adress-dialog.component';

describe('EditUserAdressDialogComponent', () => {
  let component: EditUserAdressDialogComponent;
  let fixture: ComponentFixture<EditUserAdressDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUserAdressDialogComponent]
    });
    fixture = TestBed.createComponent(EditUserAdressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
