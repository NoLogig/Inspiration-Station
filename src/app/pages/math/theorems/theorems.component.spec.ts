import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheoremsComponent } from './theorems.component';

describe('TheoremsComponent', () => {
  let component: TheoremsComponent;
  let fixture: ComponentFixture<TheoremsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TheoremsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheoremsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
