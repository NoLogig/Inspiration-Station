import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollParallaxJsComponent } from './scroll-parallax-js.component';

describe('ScrollParallaxJsComponent', () => {
  let component: ScrollParallaxJsComponent;
  let fixture: ComponentFixture<ScrollParallaxJsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollParallaxJsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollParallaxJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
