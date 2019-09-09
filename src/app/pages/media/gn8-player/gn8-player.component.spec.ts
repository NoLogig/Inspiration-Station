import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gn8PlayerComponent } from './gn8-player.component';

describe('Gn8PlayerComponent', () => {
  let component: Gn8PlayerComponent;
  let fixture: ComponentFixture<Gn8PlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gn8PlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gn8PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
