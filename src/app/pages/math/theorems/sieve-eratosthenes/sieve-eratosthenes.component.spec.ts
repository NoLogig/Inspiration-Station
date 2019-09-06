import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SieveEratosthenesComponent } from './sieve-eratosthenes.component';

describe('SieveEratosthenesComponent', () => {
  let component: SieveEratosthenesComponent;
  let fixture: ComponentFixture<SieveEratosthenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SieveEratosthenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SieveEratosthenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
