import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class GeodataVisualizationService {
  private layers: L.Layer[] = [];
  private map: L.Map | undefined;
  constructor() {}

  initializeMap(elementId: string, options?: L.MapOptions): void {
    if (this.map) {
      this.map.remove();
    }

    const defaultOptions: L.MapOptions = {
      center: [0, 0],
      zoom: 2,
      ...options,
    };

    this.map = L.map(elementId, defaultOptions);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  addLayer(map: L.Map, layer: L.Layer): void {
    this.layers.push(layer);
    layer.addTo(map);
  }

  toggleLayerVisibility(map: L.Map, layer: L.Layer, visible: boolean): void {
    visible ? layer.addTo(map) : map.removeLayer(layer);
  }

  setLayerOpacity(layer: L.Layer, opacity: number): void {
    if (layer instanceof L.TileLayer) {
      layer.setOpacity(opacity);
    }
  }
}
