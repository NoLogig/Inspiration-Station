import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiralSacksComponent } from './spiral-sacks.component';

describe('SpiralSacksComponent', () => {
  let component: SpiralSacksComponent;
  let fixture: ComponentFixture<SpiralSacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpiralSacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpiralSacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
