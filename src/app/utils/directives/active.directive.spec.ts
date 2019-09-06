import { ActiveDirective } from './active.directive';

describe('ActiveDirective', () => {
  it('should create an instance', () => {
    const directive = new ActiveDirective(null);
    expect(directive).toBeTruthy();
  });
});
