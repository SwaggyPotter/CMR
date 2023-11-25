import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongPasswordOrEmailComponent } from './wrong-password-or-email.component';

describe('WrongPasswordOrEmailComponent', () => {
  let component: WrongPasswordOrEmailComponent;
  let fixture: ComponentFixture<WrongPasswordOrEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WrongPasswordOrEmailComponent]
    });
    fixture = TestBed.createComponent(WrongPasswordOrEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
