import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiralUlamComponent } from './spiral-ulam.component';

describe('SpiralUlamComponent', () => {
  let component: SpiralUlamComponent;
  let fixture: ComponentFixture<SpiralUlamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpiralUlamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpiralUlamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
