import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeodataVisualizationComponent } from './geodata-visualization.component';

describe('GeodataVisualizationComponent', () => {
  let component: GeodataVisualizationComponent;
  let fixture: ComponentFixture<GeodataVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeodataVisualizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeodataVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
