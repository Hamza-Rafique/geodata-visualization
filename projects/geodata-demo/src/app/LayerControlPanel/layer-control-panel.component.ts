import { Component } from '@angular/core';
import { GeodataVisualizationService } from 'geodata-visualization';

@Component({
  selector: 'app-layer-control-panel',
  templateUrl: './layer-control-panel.component.html',
  styleUrls: ['./layer-control-panel.component.css'],
})
export class LayerControlPanelComponent {
  layers: { name: string; active: boolean; opacity: number; type: string }[] = [
    { name: 'Points Layer', active: true, opacity: 1, type: 'points' },
    { name: 'Polygons Layer', active: true, opacity: 1, type: 'polygons' },
    { name: 'Raster Layer', active: true, opacity: 1, type: 'raster' },
  ];

  constructor(private geodataService: GeodataVisualizationService) {}

  toggleLayer(layer: any) {
    layer.active = !layer.active;
    if (layer.active) {
        // Call activateLayer with the corresponding layer object
        this.geodataService.activateLayer(layer.type, layer.layerInstance);
    } else {
        this.geodataService.deactivateLayer(layer.type);
    }
}


  setOpacity(layer: any, opacity: number) {
    layer.opacity = opacity;
    this.geodataService.setLayerOpacity(layer.type, opacity);
  }
}
