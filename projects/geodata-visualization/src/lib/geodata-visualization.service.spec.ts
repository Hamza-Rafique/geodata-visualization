import { TestBed } from '@angular/core/testing';

import { GeodataVisualizationService } from './geodata-visualization.service';

describe('GeodataVisualizationService', () => {
  let service: GeodataVisualizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeodataVisualizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
