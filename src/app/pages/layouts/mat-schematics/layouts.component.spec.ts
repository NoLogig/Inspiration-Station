import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatLayoutsComponent } from './layouts.component';

describe('MatLayoutsComponent', () => {
  let component: MatLayoutsComponent;
  let fixture: ComponentFixture<MatLayoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatLayoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
