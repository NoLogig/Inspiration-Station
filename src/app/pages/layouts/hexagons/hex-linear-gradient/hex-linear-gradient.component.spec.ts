import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexLinearGradientComponent } from './hex-linear-gradient.component';

describe('HexLinearGradientComponent', () => {
  let component: HexLinearGradientComponent;
  let fixture: ComponentFixture<HexLinearGradientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexLinearGradientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexLinearGradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
