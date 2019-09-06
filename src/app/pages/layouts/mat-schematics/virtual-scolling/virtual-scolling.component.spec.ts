import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualScollingComponent } from './virtual-scolling.component';

describe('VirtualScollingComponent', () => {
  let component: VirtualScollingComponent;
  let fixture: ComponentFixture<VirtualScollingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualScollingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualScollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
