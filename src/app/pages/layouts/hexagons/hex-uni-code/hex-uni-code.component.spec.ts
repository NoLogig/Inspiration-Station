import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexUniCodeComponent } from './hex-uni-code.component';

describe('HexUniCodeComponent', () => {
  let component: HexUniCodeComponent;
  let fixture: ComponentFixture<HexUniCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexUniCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexUniCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
