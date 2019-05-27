import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemainderComponent } from './remainder.component';

describe('RemainderComponent', () => {
  let component: RemainderComponent;
  let fixture: ComponentFixture<RemainderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemainderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemainderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
