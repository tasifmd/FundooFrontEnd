import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LebelDialogboxComponent } from './lebel-dialogbox.component';

describe('LebelDialogboxComponent', () => {
  let component: LebelDialogboxComponent;
  let fixture: ComponentFixture<LebelDialogboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LebelDialogboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LebelDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
