import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundWavesComponent } from './sound-waves.component';

describe('SoundWavesComponent', () => {
  let component: SoundWavesComponent;
  let fixture: ComponentFixture<SoundWavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoundWavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundWavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
