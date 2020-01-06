import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PISComponent } from './pis.component';

describe('PISComponent', () => {
  let component: PISComponent;
  let fixture: ComponentFixture<PISComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PISComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PISComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
