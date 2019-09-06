import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SieveAtkinComponent } from './sieve-atkin.component';

describe('SieveAtkinComponent', () => {
  let component: SieveAtkinComponent;
  let fixture: ComponentFixture<SieveAtkinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SieveAtkinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SieveAtkinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
