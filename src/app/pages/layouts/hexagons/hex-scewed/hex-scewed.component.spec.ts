import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexScewedComponent } from './hex-scewed.component';

describe('HexScewedComponent', () => {
  let component: HexScewedComponent;
  let fixture: ComponentFixture<HexScewedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexScewedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexScewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
