import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallaxScrollCSSComponent } from './parallax-scroll.component';

describe('ParallaxScrollCSSComponent', () => {
  let component: ParallaxScrollCSSComponent;
  let fixture: ComponentFixture<ParallaxScrollCSSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParallaxScrollCSSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParallaxScrollCSSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
