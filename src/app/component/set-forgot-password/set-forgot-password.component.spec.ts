import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetForgotPasswordComponent } from './set-forgot-password.component';

describe('SetForgotPasswordComponent', () => {
  let component: SetForgotPasswordComponent;
  let fixture: ComponentFixture<SetForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetForgotPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
