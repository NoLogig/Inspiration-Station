import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexRotateImgComponent } from './hex-rotate-img.component';

describe('HexRotateImgComponent', () => {
  let component: HexRotateImgComponent;
  let fixture: ComponentFixture<HexRotateImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexRotateImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexRotateImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
