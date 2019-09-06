import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssCarouselComponent } from './css-carousel.component';

describe('CssCarouselComponent', () => {
  let component: CssCarouselComponent;
  let fixture: ComponentFixture<CssCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CssCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CssCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
