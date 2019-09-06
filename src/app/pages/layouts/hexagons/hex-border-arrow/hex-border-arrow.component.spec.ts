import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexBorderArrowComponent } from './hex-border-arrow.component';

describe('HexBorderArrowComponent', () => {
  let component: HexBorderArrowComponent;
  let fixture: ComponentFixture<HexBorderArrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexBorderArrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexBorderArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
