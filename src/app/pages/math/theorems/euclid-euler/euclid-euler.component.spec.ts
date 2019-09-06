import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheoremEuclidEulerComponent } from './euclid-euler.component';

describe('TheoremEuclidEulerComponent', () => {
  let component: TheoremEuclidEulerComponent;
  let fixture: ComponentFixture<TheoremEuclidEulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheoremEuclidEulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheoremEuclidEulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
