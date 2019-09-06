import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallaxCSSComponent } from './parallax-css.component';

describe('ParallaxCSSComponent', () => {
  let component: ParallaxCSSComponent;
  let fixture: ComponentFixture<ParallaxCSSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParallaxCSSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParallaxCSSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
