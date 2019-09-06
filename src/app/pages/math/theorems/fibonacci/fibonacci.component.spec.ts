import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FibonacciComponent } from './fibonacci.component';

describe('FibonacciComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        FibonacciComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(FibonacciComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'fibonacci'`, () => {
    const fixture = TestBed.createComponent(FibonacciComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('fibonacci');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(FibonacciComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to fibonacci!');
  });
});
