import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssCubeComponent } from './css-cube.component';

describe('CssCubeComponent', () => {
  let component: CssCubeComponent;
  let fixture: ComponentFixture<CssCubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CssCubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CssCubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
