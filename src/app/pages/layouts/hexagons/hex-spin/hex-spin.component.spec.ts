import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexSpinComponent } from './hex-spin.component';

describe('HexSpinComponent', () => {
  let component: HexSpinComponent;
  let fixture: ComponentFixture<HexSpinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexSpinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexSpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
