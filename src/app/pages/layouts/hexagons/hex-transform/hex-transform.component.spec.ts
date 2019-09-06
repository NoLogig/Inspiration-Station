import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexTransformComponent } from './hex-transform.component';

describe('HexTransformComponent', () => {
  let component: HexTransformComponent;
  let fixture: ComponentFixture<HexTransformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexTransformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexTransformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
