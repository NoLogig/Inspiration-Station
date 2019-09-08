import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallaxMouseJSComponent } from './parallax-mouse.component';

describe('ParallaxMouseJSComponent', () => {
  let component: ParallaxMouseJSComponent;
  let fixture: ComponentFixture<ParallaxMouseJSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParallaxMouseJSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParallaxMouseJSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
