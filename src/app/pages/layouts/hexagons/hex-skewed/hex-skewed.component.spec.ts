import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexSkewedComponent } from './hex-skewed.component';

describe('HexSkewedComponent', () => {
  let component: HexSkewedComponent;
  let fixture: ComponentFixture<HexSkewedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexSkewedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexSkewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
