import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FactorialComponent } from './factorial.component';

describe('FactorialComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        FactorialComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(FactorialComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'factorial'`, () => {
    const fixture = TestBed.createComponent(FactorialComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('factorial');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(FactorialComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to factorial!');
  });
});
