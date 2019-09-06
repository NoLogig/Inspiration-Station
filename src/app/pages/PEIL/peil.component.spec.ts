import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PEILComponent } from './peil.component';

describe('PEILComponent', () => {
  let component: PEILComponent;
  let fixture: ComponentFixture<PEILComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PEILComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PEILComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
