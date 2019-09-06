import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldenRatioComponent } from './golden-ratio.component';

describe('GoldenRatioComponent', () => {
  let component: GoldenRatioComponent;
  let fixture: ComponentFixture<GoldenRatioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoldenRatioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldenRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
