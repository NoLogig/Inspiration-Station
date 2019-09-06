import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PythagorasComponent } from './pythagoras.component';

describe('PythagorasComponent', () => {
  let component: PythagorasComponent;
  let fixture: ComponentFixture<PythagorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PythagorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PythagorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
