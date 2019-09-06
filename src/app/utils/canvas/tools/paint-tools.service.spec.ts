import { TestBed } from '@angular/core/testing';
import { CanvasPaintToolsService } from './paint-tools.service';

describe('', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanvasPaintToolsService = TestBed.get(CanvasPaintToolsService);
    expect(service).toBeTruthy();
  });
});
