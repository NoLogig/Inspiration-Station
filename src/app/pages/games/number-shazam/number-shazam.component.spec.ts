import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberShazamComponent } from './number-shazam.component';

describe('NumberShazamComponent', () => {
  let component: NumberShazamComponent;
  let fixture: ComponentFixture<NumberShazamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberShazamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberShazamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
