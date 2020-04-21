import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeGardenComponent } from './node.component';

describe('NodeGardenComponent', () => {
  let component: NodeGardenComponent;
  let fixture: ComponentFixture<NodeGardenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeGardenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
