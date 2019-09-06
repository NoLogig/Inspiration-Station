import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitScreenSkewedComponent } from './split-screen-skewed.component';

describe('SplitScreenSkewedComponent', () => {
  let component: SplitScreenSkewedComponent;
  let fixture: ComponentFixture<SplitScreenSkewedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitScreenSkewedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitScreenSkewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
