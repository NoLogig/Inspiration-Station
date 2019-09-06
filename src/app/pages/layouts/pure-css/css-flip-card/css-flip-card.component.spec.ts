import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssFlipCardComponent } from './css-flip-card.component';

describe('CssFlipCardComponent', () => {
  let component: CssFlipCardComponent;
  let fixture: ComponentFixture<CssFlipCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CssFlipCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CssFlipCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
