import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexGradientComponent } from './hex-gradient.component';

describe('HexGradientComponent', () => {
  let component: HexGradientComponent;
  let fixture: ComponentFixture<HexGradientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexGradientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexGradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
