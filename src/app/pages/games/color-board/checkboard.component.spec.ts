import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboardComponent } from './checkboard.component';

describe('CheckboardComponent', () => {
  let component: CheckboardComponent;
  let fixture: ComponentFixture<CheckboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
