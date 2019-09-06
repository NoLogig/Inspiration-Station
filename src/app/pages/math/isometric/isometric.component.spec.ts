import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsometricComponent } from './isometric.component';

describe('IsometricComponent', () => {
  let component: IsometricComponent;
  let fixture: ComponentFixture<IsometricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsometricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsometricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
