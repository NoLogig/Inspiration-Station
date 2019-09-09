import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecibelMeterComponent } from './decibel-meter.component';

describe('DecibelMeterComponent', () => {
  let component: DecibelMeterComponent;
  let fixture: ComponentFixture<DecibelMeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecibelMeterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecibelMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
