import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexBorderArrowImgComponent } from './hex-border-arrow-img.component';

describe('HexBorderArrowImgComponent', () => {
  let component: HexBorderArrowImgComponent;
  let fixture: ComponentFixture<HexBorderArrowImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexBorderArrowImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexBorderArrowImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
