import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexRotateComponent } from './hex-rotate.component';

describe('HexRotateComponent', () => {
  let component: HexRotateComponent;
  let fixture: ComponentFixture<HexRotateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexRotateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexRotateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
