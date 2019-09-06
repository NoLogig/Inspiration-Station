import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldenRectComponent } from './golden-rect.component';

describe('GoldenRectComponent', () => {
  let component: GoldenRectComponent;
  let fixture: ComponentFixture<GoldenRectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoldenRectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldenRectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
